package com.tracker.server.services;

import com.tracker.server.exceptions.ConflictException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.models.AdminWallet;
import com.tracker.server.repositories.AdminWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminWalletService {
    @Autowired
    private AdminWalletRepository adminWalletRepository;

    public AdminWallet getWalletById(Long id) {
        return adminWalletRepository.findById(id).orElseThrow(()->new NotFoundException("Not found: Admin wallet with id - " + id));
    }

    public List<AdminWallet> getAll() {
        return adminWalletRepository.findAll();
    }

    /**
     * Check if the wallet with the name exists
     */
    private void walletWithNameExists(String name){
        Optional<AdminWallet> aw = adminWalletRepository.findByName(name);
        if(aw.isPresent()){
            throw new ConflictException("Wallet with name '" + name + "' already exists");
        }
    }

    public AdminWallet addWallet(String name) {
        AdminWallet aw = new AdminWallet();
        aw.setName(name);
        return adminWalletRepository.save(aw);
    }

    public void deleteWallet(Long id) {
        AdminWallet aw = getWalletById(id); // this is going to throw an error if the wallet doesn't exist
        adminWalletRepository.deleteById(id);
    }

    public AdminWallet updateWallet(Long id, String name) {
        // these two throw error if the wallet with id or name already exist
        walletWithNameExists(name);
        AdminWallet aw = getWalletById(id);

        aw.setName(name);
        return adminWalletRepository.save(aw);
    }
}
