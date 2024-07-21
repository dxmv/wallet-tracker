package com.tracker.server.services;

import com.tracker.server.exceptions.BadRequestException;
import com.tracker.server.exceptions.ConflictException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.models.Crypto;
import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import com.tracker.server.repositories.CryptoRepository;
import com.tracker.server.repositories.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CryptoService {

    private final CryptoRepository cryptoRepository;
    private final WalletService walletService;
    private final WalletRepository walletRepository;


    @Autowired
    public CryptoService(CryptoRepository cryptoRepository, WalletService walletService, WalletRepository walletRepository) {
        this.cryptoRepository = cryptoRepository;
        this.walletService = walletService;
        this.walletRepository = walletRepository;
    }

    public Crypto getById(Long id){
        return cryptoRepository.findById(id).orElseThrow(() -> new NotFoundException("Crypto with id: " + id + ", not found"));
    }

    @Transactional
    protected Crypto createCrypto(Crypto crypto, Wallet wallet){
        int cryptoId = wallet.getCoins().indexOf(crypto);

        // the coin exist in the wallet, so we just add the amount
        if (cryptoId != -1) {
            return changeCryptoAmount(wallet.getCoins().get(cryptoId).getId(),wallet.getCoins().get(cryptoId).getAmount() + crypto.getAmount());
        }

        if (crypto.getAmount() < 0) {
            throw new ConflictException("The amount cannot be negative");
        }

        crypto.setWallet(wallet);
        wallet.getCoins().add(crypto);

        return cryptoRepository.save(crypto);
    }

    @Transactional
    public Crypto addCryptoToWallet(Long walletId, Crypto crypto) {
        // throws the error if the wallet doesn't belong to the current user
        Wallet wallet = walletService.getOneWalletForCurrentUser(walletId);

        Crypto newCoin = createCrypto(crypto,wallet);
        walletRepository.save(wallet);
        return newCoin;
    }

    @Transactional
    public Crypto changeCryptoAmount(Long id, double amount){
        Crypto crypto = getById(id);
        // check if the crypto belongs to a user's wallet
        // throws the error if the wallet doesn't belong to the current user
        walletService.getOneWalletForCurrentUser(crypto.getWallet().getId());

        if(amount < 0){
            throw new ConflictException("The amount of crypto cannot be negative");
        }
        crypto.setAmount(amount);
        return cryptoRepository.save(crypto);
    }

    @Transactional
    public void deleteCrypto(Long id){
        // checks if the crypto even exists
        Crypto crypto = getById(id);
        // check if the crypto belongs to a user's wallet
        // throws the error if the wallet doesn't belong to the current user
        walletService.getOneWalletForCurrentUser(crypto.getWallet().getId());

        cryptoRepository.deleteById(id);
    }

    public Set<Crypto> getAllForUser() {
        // TODO: compare by market cap rank
        // Use a TreeSet with a custom comparator
        TreeSet<Crypto> cryptoSet = new TreeSet<>(Comparator.comparing(Crypto::getName));
        Map<String, Crypto> cryptoMap = new HashMap<>();

        // Get all wallets for the current user
        List<Wallet> wallets = walletService.getWalletsForCurrentUser();

        for (Wallet wallet : wallets) {
            for (Crypto crypto : wallet.getCoins()) {
                String cryptoName = crypto.getName();
                if (cryptoMap.containsKey(cryptoName)) {
                    // Update the amount if the crypto already exists
                    Crypto existingCrypto = cryptoMap.get(cryptoName);
                    existingCrypto.setAmount(existingCrypto.getAmount() + crypto.getAmount());
                } else {
                    // Add new crypto to the set and map
                    cryptoSet.add(crypto);
                    cryptoMap.put(cryptoName, crypto);
                }
            }
        }

        return cryptoSet;
    }

    public List<Wallet> getAllWalletsForCryptoWithName(String name) {
        List<Wallet> all = walletService.getWalletsForCurrentUser();
        List<Wallet> res = new ArrayList<>();

        for(Wallet w:all){
            if(w.getCoins().stream().anyMatch(el->el.getName().equals(name))){
                res.add(w);
            }
        }
        return res;
    }
}
