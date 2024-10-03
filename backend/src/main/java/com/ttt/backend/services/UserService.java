package com.ttt.backend.services;

import com.ttt.backend.models.User;
import com.ttt.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getByEmail(String email){
        return userRepository.findByEmail(email);
    }
    public boolean existsWithEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }

}
