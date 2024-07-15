package com.tracker.server.controllers;

import com.tracker.server.models.Crypto;
import com.tracker.server.models.Wallet;
import com.tracker.server.services.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crypto")
public class CryptoController {
    @Autowired
    private CryptoService cryptoService;

    /**
     * Returns all crypto that belongs to the current user
     */
    @GetMapping("/")
    public ResponseEntity<List<Crypto>> getCryptoForUser(){
        return new ResponseEntity<>(cryptoService.getAllForUser(), HttpStatus.OK);
    }

    /**
     * Adds crypto to the wallet
     */
    @PostMapping("/{walletId}")
    public ResponseEntity<Crypto> addCryptoToWallet(@PathVariable Long walletId, @RequestBody Crypto crypto){
        return new ResponseEntity<>(cryptoService.addCryptoToWallet(walletId,crypto),HttpStatus.CREATED);
    }

    /**
     * Changes the amount of crypto
     */
    @PatchMapping("/{cryptoId}")
    public ResponseEntity<Crypto> updateCrypto(@PathVariable Long cryptoId, @RequestBody double amount){
        return new ResponseEntity<>(cryptoService.changeCryptoAmount(cryptoId,amount),HttpStatus.CREATED);
    }


    @DeleteMapping("/{cryptoId}")
    public ResponseEntity<String> deleteCrypto(@PathVariable Long cryptoId){
        cryptoService.deleteCrypto(cryptoId);
        return new ResponseEntity<>("Success",HttpStatus.OK);
    }
}
