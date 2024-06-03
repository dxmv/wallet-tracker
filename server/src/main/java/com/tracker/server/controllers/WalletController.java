package com.tracker.server.controllers;

import com.tracker.server.models.Crypto;
import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import com.tracker.server.services.WalletService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {


    @Getter
    @Setter
    static
    class CryptoRequest{
        private String name;
        private String ticker;
        private double amount;
    }

    @Autowired
    private WalletService walletService;

    @GetMapping("/")
    public ResponseEntity<List<Wallet>> getAllWalletsForCurrentUser(){
        return new ResponseEntity<>(walletService.getWalletsForCurrentUser(),HttpStatus.OK);
    }

    @GetMapping("/{walletId}")
    public ResponseEntity<Wallet> getOneWallet(@PathVariable Long walletId){
        return new ResponseEntity<>(walletService.getOneWalletForCurrentUser(walletId),HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Wallet> createWalletForCurrentUser(@RequestBody String name){
        return new ResponseEntity<>(walletService.createWalletForCurrentUser(name),HttpStatus.CREATED);
    }

    @DeleteMapping("/{walletId}")
    public ResponseEntity<String> deleteWallet(@PathVariable Long walletId){
        walletService.deleteWalletForCurrentUser(walletId);
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }


    @PostMapping("/{walletId}")
    public ResponseEntity<Wallet> addCrypto(@PathVariable Long walletId, @RequestBody CryptoRequest cryptoRequest){
        return new ResponseEntity<>(walletService.addCryptoToWallet(walletId,cryptoRequest.getName(),cryptoRequest.getTicker(),cryptoRequest.getAmount()),HttpStatus.CREATED);
    }

}


