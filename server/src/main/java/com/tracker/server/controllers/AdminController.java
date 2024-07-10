package com.tracker.server.controllers;

import com.tracker.server.models.Role;
import com.tracker.server.models.User;
import com.tracker.server.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * All admin functionalities
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

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


}
