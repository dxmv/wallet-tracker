package com.tracker.server.services;


import com.tracker.server.exceptions.BadRequestException;
import com.tracker.server.models.Role;
import com.tracker.server.models.User;
import com.tracker.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private UserService userService;
    private UserRepository userRepository;
    @Autowired
    public AdminService(UserService userService,UserRepository userRepository){
        this.userService = userService;
        this.userRepository = userRepository;
    }

    /**
     * promotes the user with the given user id to admin
     * */
    public User promoteUserToAdmin(Long id){
        User u = userService.getUserById(id);
        // check if the user is already an admin
        if(u.getRoles().contains(Role.ADMIN)){
            throw new BadRequestException("User is already an admin");
        }

        u.getRoles().add(Role.ADMIN);
        return userRepository.save(u);
    }

    /**
     * demotes the user with the given user id to admin
     */
    public User demoteUserFromAdmin(Long id){
        User u = userService.getUserById(id);
        // check if the user isn't an admin
        if(!u.getRoles().contains(Role.ADMIN)){
            throw new BadRequestException("User isn't an admin");
        }

        u.getRoles().remove(Role.ADMIN);
        return userRepository.save(u);
    }
}
