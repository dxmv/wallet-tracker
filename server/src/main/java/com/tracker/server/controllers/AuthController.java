package com.tracker.server.controllers;

import com.tracker.server.models.User;
import com.tracker.server.services.AuthService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Getter
    @Setter
    static
    class AuthenticationRequest{
        String email;
        String password;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    class AuthenticationResponse {
        private final String jwt;
    }

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        return new ResponseEntity<>(new AuthenticationResponse(authService.loginUser(authenticationRequest.getEmail(),authenticationRequest.getPassword())),HttpStatus.CREATED);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> createUser(@RequestBody AuthenticationRequest user){
        return new ResponseEntity<>(authService.registerUser(user.getEmail(),user.getPassword()),HttpStatus.CREATED);
    }
}



