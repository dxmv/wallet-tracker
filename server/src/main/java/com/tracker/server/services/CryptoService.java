package com.tracker.server.services;

import com.tracker.server.models.Crypto;
import com.tracker.server.repositories.CryptoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CryptoService {

    @Autowired
    private CryptoRepository cryptoRepository;

    public List<Crypto> getAll(){
        return cryptoRepository.findAll();
    }
}
