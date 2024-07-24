package com.tracker.server.controllers;

import com.tracker.server.models.Crypto;
import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import com.tracker.server.models.responses.DeleteResponse;
import com.tracker.server.services.CryptoService;
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

    @PostMapping("/{id}")
    public ResponseEntity<Wallet> addWalletForCurrentUser(@PathVariable Long id){
        return new ResponseEntity<>(walletService.addWalletForCurrentUser(id),HttpStatus.CREATED);
    }

    @PatchMapping("/name/{id}")
    public ResponseEntity<Wallet> updateWalletName(@PathVariable Long id,@RequestBody String walletName){
        return new ResponseEntity<>(walletService.updateName(id,walletName),HttpStatus.OK);
    }

    @DeleteMapping("/{walletId}")
    public ResponseEntity<DeleteResponse> deleteWallet(@PathVariable Long walletId){
        walletService.deleteWalletForCurrentUser(walletId);
        return new ResponseEntity<>(new DeleteResponse("Deleted"),HttpStatus.OK);
    }

}


