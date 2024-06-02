package com.tracker.server.services;


import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import com.tracker.server.repositories.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WalletService {
    private final WalletRepository walletRepository;
    private final UserService userService;

    @Autowired
    public WalletService(WalletRepository walletRepository,UserService userService){
        this.walletRepository=walletRepository;
        this.userService=userService;
    }

    public List<Wallet> getAllWallets(){
        return this.walletRepository.findAll();
    }

    public List<Wallet> getAllWalletsForUser(Long userId){
        return this.walletRepository.findWalletsForUser(userId);
    }

    public Wallet createWalletForCurrentUser(String name){
        User u= userService.getCurrentUser();
        if(u == null){
            return null;
        }

        // if the current user exists, then create the wallet
        Wallet w=new Wallet();
        w.setName(name);
        w.setUser(u);
        return walletRepository.save(w);
    }

    public void deleteWalletForCurrentUser(Long walletId){
        Wallet w = walletRepository.findById(walletId).orElseThrow(()->new NotFoundException("Wallet with id:" + walletId + ", not found"));
        User u = userService.getCurrentUser();
        if(u == null){
            return;
        }
        if(u.equals(w.getUser())){
            this.walletRepository.deleteById(walletId);
        }
    }

    public List<Wallet> getWalletsForCurrentUser() {
        User u = userService.getCurrentUser();
        // if the current user exists, then get all the wallets
        if(u == null){
            return null;
        }
        return getAllWalletsForUser(u.getId());
    }
}
