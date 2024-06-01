package com.tracker.server.security;

import com.tracker.server.models.User;
import com.tracker.server.repositories.UserRepository;
import com.tracker.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)  {
        User u = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return
                org.springframework.security.core.userdetails.User.withUsername(u.getEmail())
                .password(u.getPassword())
                .authorities("USER") // No roles, just grant authority as "USER"
                .build();
    }
}
