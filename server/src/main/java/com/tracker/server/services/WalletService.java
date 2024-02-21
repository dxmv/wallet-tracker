package com.tracker.server.services;


import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import com.tracker.server.repositories.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Wallet createWallet(String name,Long userId){
        User u=this.userService.getUserById(userId);
        // if the user with the given id exists, then create the wallet
        Wallet w=new Wallet();
        w.setName(name);
        w.setUser(u);
        return this.walletRepository.save(w);
    }

    public void deleteWallet(Long walletId){
        // check if the wallet doesn't exist
        if(!this.walletRepository.existsById(walletId)){
            return;
        }
        // TODO: check if this is the wallet of the current user
        this.walletRepository.deleteById(walletId);
    }
}
