package com.ttt.backend.service;

import com.ttt.backend.entity.Role;
import com.ttt.backend.entity.User;
import com.ttt.backend.repository.RefreshTokenRepository;
import com.ttt.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public UserService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public List<User> getAllUsers() {return userRepository.findAll();}

    public Optional<User> getByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public boolean existsWithEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }

    public void delete(Long id) {
        userRepository.findById(id).ifPresentOrElse(
                (user) -> {
                    if(user.getRole()!= Role.ADMIN){
                        refreshTokenRepository.deleteByUser(user);
                        userRepository.delete(user);
                    }
                    else{
                        throw new RuntimeException("You can't delete admin!");
                    }
                },
                () -> {throw new RuntimeException("User not found!");});
    }

    public User editRole(Long id, Role role) {
        return userRepository.findById(id).map(
                (user) -> {
                    user.setRole(role);
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }
}
