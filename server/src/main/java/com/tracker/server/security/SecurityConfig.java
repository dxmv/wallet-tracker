package com.tracker.server.security;

import com.tracker.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig{

    private final UserRepository userRepository;

    @Autowired
    public SecurityConfig(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService(userRepository); // my implementation of user details service
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    } // for hashing in app

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(requestMatcherRegistry -> requestMatcherRegistry.req)
            .requestMatchers("/api/login/**").permitAll() // Allow access to public endpoints
            .anyRequest().authenticated(); // Require authentication for all other endpoints
        return http.build();
    }
}
