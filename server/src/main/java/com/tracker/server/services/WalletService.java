package com.tracker.server.services;


import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import com.tracker.server.repositories.UserRepository;
import com.tracker.server.repositories.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WalletService {
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    @Autowired
    public WalletService(WalletRepository walletRepository,UserRepository userRepository){
        this.walletRepository=walletRepository;
        this.userRepository=userRepository;
    }

    public List<Wallet> getAllWallets(){
        return this.walletRepository.findAll();
    }

    public List<Wallet> getAllWalletsForUser(Long userId){
        return this.walletRepository.findWalletsForUser(userId);
    }

    public Wallet createWallet(String name,Long userId){
        Optional<User> u=this.userRepository.findById(userId);
        // if the user with the given id exists, then create the wallet
        if(u.isPresent()){
            Wallet w=new Wallet();
            w.setName(name);
            w.setUser(u.get());
            return this.walletRepository.save(w);
        }
        return null;
    }
}
