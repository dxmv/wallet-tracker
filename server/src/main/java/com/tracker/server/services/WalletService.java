package com.tracker.server.services;


import com.tracker.server.exceptions.BadRequestException;
import com.tracker.server.exceptions.ConflictException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.exceptions.UnauthorizedException;
import com.tracker.server.models.AdminWallet;
import com.tracker.server.models.Crypto;
import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import com.tracker.server.repositories.CryptoRepository;
import com.tracker.server.repositories.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WalletService {
    private final WalletRepository walletRepository;
    private final UserService userService;

    private final CryptoService cryptoService;

    private AdminWalletService adminWalletService;
    @Autowired
    public WalletService(WalletRepository walletRepository,UserService userService,CryptoService cryptoService, AdminWalletService adminWalletService){
        this.walletRepository=walletRepository;
        this.userService=userService;
        this.cryptoService = cryptoService;
        this.adminWalletService = adminWalletService;
    }



    public Wallet getWalletById(Long walletId) {return walletRepository.findById(walletId).orElseThrow(()->new NotFoundException("Wallet with id: " + walletId + ", not found"));}

    public List<Wallet> getAllWalletsForUser(Long userId){
        return this.walletRepository.findWalletsForUser(userId);
    }

    @Transactional
    public Wallet addWalletForCurrentUser(Long adminWalletId){
        User u = userService.getCurrentUser();
        AdminWallet aw = adminWalletService.getWalletById(adminWalletId);

        // if the current user exists, then create the wallet
        Wallet w = new Wallet();
        w.setAdminWallet(aw);
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

        wallet.getCoins().add(cryptoService.createCrypto(crypto,wallet));
        return walletRepository.save(wallet);
    }

}
