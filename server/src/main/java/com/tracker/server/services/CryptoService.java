package com.tracker.server.services;

import com.tracker.server.exceptions.BadRequestException;
import com.tracker.server.exceptions.ConflictException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.models.Crypto;
import com.tracker.server.models.Wallet;
import com.tracker.server.repositories.CryptoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CryptoService {

    @Autowired
    private CryptoRepository cryptoRepository;

    public Crypto getById(Long id){
        return cryptoRepository.findById(id).orElseThrow(() -> new NotFoundException("Crypto with id: " + id + ", not found"));
    }

    public Crypto createCrypto(Crypto crypto, Wallet wallet){
        boolean cryptoExistsInWallet = wallet.getCoins().stream()
                .anyMatch(existingCrypto -> existingCrypto.getName().equals(crypto.getName()) && existingCrypto.getTicker().equals(crypto.getTicker()));

        // the coin exist in the wallet
        if (cryptoExistsInWallet) {
            throw new BadRequestException("The wallet already has this crypto");
        }

        if (crypto.getAmount() < 0) {
            throw new ConflictException("The amount cannot be negative");
        }

        crypto.setWallet(wallet);
        return cryptoRepository.save(crypto);
    }

    public Crypto changeCryptoAmount(Long id, double amount){
        Crypto crypto = getById(id);

        if(amount < 0){
            throw new ConflictException("The amount of crypto cannot be negative");
        }
        crypto.setAmount(amount);
        return cryptoRepository.save(crypto);
    }

    public void deleteCrypto(Long id){
        // check if it exists
        if(!cryptoRepository.existsById(id)){
            throw new NotFoundException("Crypto with id: " + id + ", not found");
        }

        cryptoRepository.deleteById(id);
    }
}
