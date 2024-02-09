package com.tracker.server.controllers;

import com.tracker.server.models.User;
import com.tracker.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAllUsers(){
        return this.userService.getAllUsers();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<User> getUserById(@PathVariable Long id){
        return this.userService.getUserById(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user){
        return this.userService.saveUser(user);
    }
}
