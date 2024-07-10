package com.tracker.server.controllers;

import com.tracker.server.models.Crypto;
import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
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

    @Autowired
    private CryptoService cryptoService;

    @GetMapping("/")
    public ResponseEntity<List<Wallet>> getAllWalletsForCurrentUser(){
        return new ResponseEntity<>(walletService.getWalletsForCurrentUser(),HttpStatus.OK);
    }

    @GetMapping("/{walletId}")
    public ResponseEntity<Wallet> getOneWallet(@PathVariable Long walletId){
        return new ResponseEntity<>(walletService.getOneWalletForCurrentUser(walletId),HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Wallet> createWalletForCurrentUser(@PathVariable Long id){
        return new ResponseEntity<>(walletService.addWalletForCurrentUser(id),HttpStatus.CREATED);
    }

    @DeleteMapping("/{walletId}")
    public ResponseEntity<String> deleteWallet(@PathVariable Long walletId){
        walletService.deleteWalletForCurrentUser(walletId);
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }


    @PostMapping("/crypto/{walletId}")
    public ResponseEntity<Wallet> addCrypto(@PathVariable Long walletId, @RequestBody Crypto crypto){
        return new ResponseEntity<>(walletService.addCryptoToWallet(walletId,crypto),HttpStatus.CREATED);
    }

    @PatchMapping("/crypto/{walletId}/{cryptoId}")
    public ResponseEntity<Wallet> changeAmountCrypto(@PathVariable Long walletId, @PathVariable Long cryptoId, @RequestBody Double amount){
        cryptoService.changeCryptoAmount(cryptoId,amount);
        return new ResponseEntity<>(walletService.getWalletById(walletId),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/crypto/{walletId}/{cryptoId}")
    public ResponseEntity<Wallet> removeCrypto(@PathVariable Long walletId, @PathVariable Long cryptoId){
        cryptoService.deleteCrypto(cryptoId);
        return new ResponseEntity<>(walletService.getWalletById(walletId),HttpStatus.CREATED);
    }

}


