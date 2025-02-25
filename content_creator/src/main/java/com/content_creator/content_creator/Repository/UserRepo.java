package com.content_creator.content_creator.Repository;

import java.util.Optional;

import com.content_creator.content_creator.Entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);
    
}
