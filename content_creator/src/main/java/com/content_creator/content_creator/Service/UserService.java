package com.content_creator.content_creator.Service;

import java.util.List;
import java.util.Optional;

import com.content_creator.content_creator.Entity.User;
import com.content_creator.content_creator.Repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Boolean loginUserDetails(User user)
    {
        //System.out.println("+++++++++++++++++++++++++++service-"+user);
        User userCheck = userRepository.findByUsername(user.getUsername()).orElse(null);
        // System.out.println("+++++++++++++++++++++++++++service-"+userCheck);
        // System.out.println("+++++++++++++++++++++++++++service-"+user.getUsername());
        if(userCheck.getUsername().equals(user.getUsername()))
        {
            
            return true;
        }
        return false;
    }
}
