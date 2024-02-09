package com.tracker.server.services;

import com.tracker.server.models.Crypto;
import com.tracker.server.repositories.CryptoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CryptoService {
    private final CryptoRepository cryptoRepository;

    @Autowired
    public CryptoService(CryptoRepository cryptoRepository) {
        this.cryptoRepository = cryptoRepository;
    }

}
