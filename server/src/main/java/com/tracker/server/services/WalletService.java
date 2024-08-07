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
    private final AdminWalletService adminWalletService;
    @Autowired
    public WalletService(WalletRepository walletRepository,UserService userService, AdminWalletService adminWalletService){
        this.walletRepository=walletRepository;
        this.userService=userService;
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
        // Count existing wallets for this admin wallet
        int walletCount = walletRepository.countByAdminWalletId(adminWalletId);


        // if the current user & admin wallet exist, then create the wallet
        Wallet w = new Wallet();
        w.setAdminWallet(aw);
        w.setUser(u);
        // Generate the wallet name
        w.setWalletName(aw.getName() + " " + (walletCount + 1));
        return walletRepository.save(w);
    }

    @Transactional
    public void deleteWalletForCurrentUser(Long walletId){
        Wallet w = getWalletById(walletId);
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

    /**
     * Returns a wallet with a name changed to walletName
     */
    public Wallet updateName(Long id, String walletName) {
        Wallet w = this.getOneWalletForCurrentUser(id); // handles all potential errors
        w.setWalletName(walletName);
        return walletRepository.save(w);
    }
}
