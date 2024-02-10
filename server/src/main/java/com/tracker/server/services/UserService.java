package com.tracker.server.services;

import com.tracker.server.models.User;
import com.tracker.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() { return this.userRepository.findAll(); }

    public Optional<User> getUserById(Long id) { return this.userRepository.findById(id); }

    public User createUser(User user) {
        // if a user with the given email exists, then don't create a new user
        if(!this.userRepository.findByEmail(user.getEmail()).isPresent()){
            // TODO: Password encryption
            return this.userRepository.save(user);
        }
        return null;
    }



}
