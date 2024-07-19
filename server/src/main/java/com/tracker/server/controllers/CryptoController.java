package com.tracker.server.controllers;

import com.tracker.server.models.Crypto;
import com.tracker.server.models.Wallet;
import com.tracker.server.models.responses.DeleteResponse;
import com.tracker.server.services.CryptoService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/crypto")
public class CryptoController {
    @Autowired
    private CryptoService cryptoService;

    /**
     * Returns all crypto that belongs to the current user
     */
    @GetMapping("/")
    public ResponseEntity<Set<Crypto>> getCryptoForUser(){
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

    /**
     * Deletes the crypto with the given id
     */
    @DeleteMapping("/{cryptoId}")
    public ResponseEntity<DeleteResponse> deleteCrypto(@PathVariable Long cryptoId){
        cryptoService.deleteCrypto(cryptoId);
        return new ResponseEntity<>(new DeleteResponse("Deleted"),HttpStatus.OK);
    }

}
