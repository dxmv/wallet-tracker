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

    public User saveUser(User user) { return this.userRepository.save(user); }

}
