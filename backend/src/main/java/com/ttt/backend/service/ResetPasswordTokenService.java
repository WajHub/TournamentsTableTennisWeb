package com.ttt.backend.service;

import com.ttt.backend.model.entity.auth.ResetPasswordToken;
import com.ttt.backend.model.entity.auth.User;
import com.ttt.backend.repository.ResetPasswordTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.channels.FileChannel;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResetPasswordTokenService {

    @Value("${security.reset_password_token.expiration-time}")
    private Long tokenDurationMs;

    @Autowired
    private ResetPasswordTokenRepository resetPasswordTokenRepository;

    public ResetPasswordToken createResetPasswordToken (User user){
        ResetPasswordToken resetPasswordToken =  ResetPasswordToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes((tokenDurationMs)/(60*60)) )
                .build();
        return resetPasswordTokenRepository.save(resetPasswordToken);
    }

    public Optional<ResetPasswordToken> activateToken(String token) {
        return resetPasswordTokenRepository.findByToken(token);
    }
}
