package com.tracker.server.controllers;

import com.tracker.server.models.User;
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

    @Autowired
    private WalletService walletService;

    @GetMapping("/user/")
    public ResponseEntity<List<Wallet>> getAllWalletsForCurrentUser(){
        return new ResponseEntity<>(walletService.getWalletsForCurrentUser(),HttpStatus.OK);
    }

    @PostMapping("/user/")
    public ResponseEntity<Wallet> createWalletForCurrentUser(@RequestBody String name){
        return new ResponseEntity<>(walletService.createWalletForCurrentUser(name),HttpStatus.CREATED);
    }

    @DeleteMapping("/user/{walletId}")
    public ResponseEntity<String> deleteWallet(@PathVariable Long walletId){
        walletService.deleteWalletForCurrentUser(walletId);
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }
}
