package com.tracker.server.services;


import com.tracker.server.exceptions.BadRequestException;
import com.tracker.server.exceptions.ConflictException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.exceptions.UnauthorizedException;
import com.tracker.server.models.Crypto;
import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import com.tracker.server.repositories.CryptoRepository;
import com.tracker.server.repositories.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WalletService {
    private final WalletRepository walletRepository;
    private final UserService userService;

    private final CryptoRepository cryptoRepository;

    @Autowired
    public WalletService(WalletRepository walletRepository,UserService userService,CryptoRepository cryptoRepository){
        this.walletRepository=walletRepository;
        this.userService=userService;
        this.cryptoRepository = cryptoRepository;
    }


    public List<Wallet> getAllWallets(){
        return this.walletRepository.findAll();
    }

    public Wallet getWalletById(Long walletId) {return walletRepository.findById(walletId).orElseThrow(()->new NotFoundException("Wallet with id: " + walletId + ", not found"));}

    public List<Wallet> getAllWalletsForUser(Long userId){
        return this.walletRepository.findWalletsForUser(userId);
    }

    @Transactional
    public Wallet createWalletForCurrentUser(String name){
        User u= userService.getCurrentUser();

        // if the current user exists, then create the wallet
        Wallet w = new Wallet();
        w.setName(name);
        w.setUser(u);
        // add wallet to user?
        return walletRepository.save(w);
    }

    @Transactional
    public void deleteWalletForCurrentUser(Long walletId){
        Wallet w = walletRepository.findById(walletId).orElseThrow(()->new NotFoundException("Wallet with id:" + walletId + ", not found"));
        User u = userService.getCurrentUser();
        if(u.equals(w.getUser())){
            this.walletRepository.deleteById(walletId);
        }
        else{
            throw new UnauthorizedException("The user doesn't own this wallet, wallet id: " + walletId);
        }
    }

    public List<Wallet> getWalletsForCurrentUser() {
        User u = userService.getCurrentUser();

        // if the current user exists, then get all the wallets
        return getAllWalletsForUser(u.getId());
    }

    public Wallet getOneWalletForCurrentUser(Long walletId) {
        Wallet w = this.getWalletById(walletId);
        User u = userService.getCurrentUser();

        // if the user isn't the owner of the wallet
        // or if the user doesn't exist throw the exception
        if(!w.getUser().equals(u)){
            throw new UnauthorizedException("The user doesn't own this wallet, wallet id: " + walletId);
        }
        return w;
    }


    @Transactional
    public Wallet addCryptoToWallet(Long walletId, Crypto crypto) {
        Wallet wallet = getOneWalletForCurrentUser(walletId);
        boolean cryptoExistsInWallet = wallet.getCoins().stream()
                .anyMatch(existingCrypto -> existingCrypto.getName().equals(crypto.getName()) && existingCrypto.getTicker().equals(crypto.getTicker()));

        // the coin doesn't exist in the wallet
        if (cryptoExistsInWallet) {
            throw new BadRequestException("The wallet already has this crypto");
        }

        if (crypto.getAmount() < 0) {
            throw new ConflictException("The amount cannot be negative");
        }

        crypto.setWallet(wallet);
        wallet.getCoins().add(cryptoRepository.save(crypto));
        return walletRepository.save(wallet);
    }

    @Transactional
    public Wallet removeCrypto(Long walletId, Long cryptoId){
        // make sure that both the wallet and crypto exist
        Wallet wallet = getOneWalletForCurrentUser(walletId);
        Crypto crypto = cryptoRepository.findById(cryptoId).orElseThrow(()->new NotFoundException("Crypto with id: " + cryptoId + ", not found"));

        cryptoRepository.delete(crypto);
        return wallet;
    }

//    @Transactional
//    public Wallet changeCryptoWalletAmount(Long walletId,Long cryptoId,double amount){
////        Wallet wallet = getOneWalletForCurrentUser(walletId);
////        Crypto crypto =
////
////        // the coin doesn't exist in the wallet
////        if (cryptoExistsInWallet) {
////            throw new BadRequestException("The wallet already has this crypto");
////        }
////
////        if (amount < 0) {
////            throw new ConflictException("The amount cannot be negative");
////        }
//    }
}
