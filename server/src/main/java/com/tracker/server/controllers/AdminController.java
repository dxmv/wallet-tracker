package com.tracker.server.controllers;

import com.tracker.server.models.AdminWallet;
import com.tracker.server.models.Role;
import com.tracker.server.models.User;
import com.tracker.server.services.AdminService;
import com.tracker.server.services.AdminWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * All admin functionalities
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    public static class AdminWalletRequestBody{
        public String name;
    }

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminWalletService adminWalletService;

    /**
     * Promotes the user with the given id
    */
    @PatchMapping("/promote/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> promoteUser(@PathVariable Long id){
        return new ResponseEntity<>(adminService.promoteUserToAdmin(id),HttpStatus.OK);
    }

    /**
     * Demotes the user with the given id
     */
    @PatchMapping("/demote/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> demoteUser(@PathVariable Long id){
        return new ResponseEntity<>(adminService.demoteUserFromAdmin(id),HttpStatus.OK);
    }

    /**
     * Returns all wallets made by admins
     */
    @GetMapping("/wallets")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<AdminWallet>> getAllWallets(){
        return new ResponseEntity<>(adminWalletService.getAll(),HttpStatus.OK);
    }

    /**
     * Returns one wallet made by admins
     */
    @GetMapping("/wallets/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AdminWallet> getWalletById(@PathVariable Long id){
        return new ResponseEntity<>(adminWalletService.getWalletById(id),HttpStatus.CREATED);
    }

    /**
     * Adds an admin wallet
     */
    @PostMapping("/wallets")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AdminWallet> addWallet(@RequestBody AdminWalletRequestBody aw){
        return new ResponseEntity<>(adminWalletService.addWallet(aw.name),HttpStatus.OK);
    }

    /**
     * Updates the admin wallet
     */
    @PutMapping("/wallets/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AdminWallet> updateWallet(@PathVariable Long id,@RequestBody AdminWalletRequestBody aw){
        return new ResponseEntity<>(adminWalletService.updateWallet(id,aw.name),HttpStatus.OK);
    }

    /**
     * Deletes an admin wallet
     */
    @DeleteMapping("/wallets/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteWallet(@PathVariable Long id){
        adminWalletService.deleteWallet(id);
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }
}
