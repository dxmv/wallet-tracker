package com.tracker.server.services;

import com.tracker.server.exceptions.BadRequestException;
import com.tracker.server.exceptions.ConflictException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.exceptions.UnauthorizedException;
import com.tracker.server.models.Role;
import com.tracker.server.models.User;
import com.tracker.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    public User getUserById(Long id) {
        Optional<User> user=this.userRepository.findById(id);
        if(user.isEmpty()){
            throw new NotFoundException("Not found: User with id - "+id);
        }
        return this.userRepository.findById(id).orElseThrow(()->new NotFoundException("Not found: user with id :" + id));
    }

    public User getCurrentUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User) {
            Long userId = ((User) principal).getId();
            return getUserById(userId);
        }
        throw new UnauthorizedException("The user isn't logged in");
    }

}
