package com.tracker.server.controllers;

import com.tracker.server.models.Wallet;
import com.tracker.server.services.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {
    private final WalletService walletService;

    @Autowired
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Wallet> getAllWalletsForUser(@PathVariable Long userId){
        return this.walletService.getAllWalletsForUser(userId);
    }

    @PostMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Wallet createWalletForUser(@PathVariable Long userId,@RequestBody String name){
        return walletService.createWallet(name,userId);
    }

    @DeleteMapping("/{walletId}")
    public String deleteWallet(@PathVariable Long walletId){
        this.walletService.deleteWallet(walletId);
        return "Okay";
    }
}
