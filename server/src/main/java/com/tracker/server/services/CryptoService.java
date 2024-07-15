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

import java.util.ArrayList;
import java.util.List;

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

    private Crypto createCrypto(Crypto crypto, Wallet wallet){
        boolean cryptoExistsInWallet = wallet.getCoins().stream()
                .anyMatch(existingCrypto -> existingCrypto.getName().equals(crypto.getName()) && existingCrypto.getTicker().equals(crypto.getTicker()));

        // the coin exist in the wallet
        if (cryptoExistsInWallet) {
            throw new BadRequestException("The wallet already has this crypto");
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
        Wallet wallet = walletService.getOneWalletForCurrentUser(walletId);

        Crypto newCoin = createCrypto(crypto,wallet);
        walletRepository.save(wallet);
        return newCoin;
    }

    @Transactional
    public Crypto changeCryptoAmount(Long id, double amount){
        Crypto crypto = getById(id);

        if(amount < 0){
            throw new ConflictException("The amount of crypto cannot be negative");
        }
        crypto.setAmount(amount);
        return cryptoRepository.save(crypto);
    }

    @Transactional
    public void deleteCrypto(Long id){
        // check if it exists
        if(!cryptoRepository.existsById(id)){
            throw new NotFoundException("Crypto with id: " + id + ", not found");
        }

        cryptoRepository.deleteById(id);
    }

    public List<Crypto> getAllForUser() {
        List<Crypto> crypto = new ArrayList<>();
        List<Wallet> wallets = walletService.getWalletsForCurrentUser();
        for(Wallet w:wallets){
            crypto.addAll(w.getCoins());
        }
        return crypto;
    }
}
