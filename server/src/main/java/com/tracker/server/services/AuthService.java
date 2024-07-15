package com.tracker.server.services;

import com.tracker.server.exceptions.ConflictException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.models.Role;
import com.tracker.server.models.User;
import com.tracker.server.repositories.UserRepository;
import com.tracker.server.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;



    /**
     Returns a JWT token
    */
    public String loginUser(String email, String password){
        // try to find the user
        User u = userRepo.findByEmail(email).orElseThrow(()->new NotFoundException("No users with email: " + email));

        // if the user exists check does the password match
        if(!passwordEncoder.matches(password,u.getPassword())){
            throw new NotFoundException("Incorrect password" );
        }
        return jwtUtil.generateToken(String.valueOf(u.getId()));
    }

    /**
     * Registers the user
     * Returns the user object
     */
    public User registerUser(String email, String password){
        // if a user with a given email exists then the request is bad
        if(userRepo.findByEmail(email).isPresent()){
            throw new ConflictException("Conflict: User with email - " + email + ", already exists");
        }

        User u = new User();
        // set the default role to user
        u.getRoles().add(Role.ADMIN);
        u.setEmail(email);
        u.setPassword(this.passwordEncoder.encode(password));
        return userRepo.save(u);
    }
}
