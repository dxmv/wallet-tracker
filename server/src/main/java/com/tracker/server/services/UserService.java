package com.tracker.server.services;

import com.tracker.server.exceptions.ConflictException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.models.User;
import com.tracker.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    public List<User> getAllUsers() { return this.userRepository.findAll(); }

    public User getUserById(Long id) {
        Optional<User> user=this.userRepository.findById(id);
        if(user.isEmpty()){
            throw new NotFoundException("Not found: User with id - "+id);
        }
        return this.userRepository.findById(id).get();
    }

    public User createUser(User user) {
        // if a user with a given email exists then the request is bad
        if(this.userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new ConflictException("Conflict: User with email - "+user.getEmail()+", already exists");
        }
        // if a user with the given email exists, then don't create a new user
        String password=user.getPassword();
        user.setPassword(this.passwordEncoder.encode(password));
        return this.userRepository.save(user);
    }



}
