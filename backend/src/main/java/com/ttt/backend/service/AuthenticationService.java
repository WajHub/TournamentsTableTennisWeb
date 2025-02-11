package com.ttt.backend.service;


import com.ttt.backend.dto.RegisterUserDto;
import com.ttt.backend.dto.LoginUserDto;
import com.ttt.backend.dto.request.ChangePasswordRequest;
import com.ttt.backend.model.enums.Role;
import com.ttt.backend.model.entity.auth.User;
import com.ttt.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        User user = User.builder()
                .fullName(input.getFullName())
                .email(input.getEmail())
                .password(passwordEncoder.encode(input.getPassword()))
                .role(Role.USER)
                .isActive(false)
                .build();
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getIsActive()){
            throw new RuntimeException("Account not verified. Please verify your account.");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return user;
    }

    public void changePassword(ChangePasswordRequest changePasswordRequest, User user) {
        System.out.println(changePasswordRequest);
        if(passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword()) &&
            changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmationNewPassword())){
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            userRepository.save(user);
        }
        else throw new RuntimeException("Bad credentials!");
    }

}
