package com.ttt.backend.service;

import com.ttt.backend.entity.auth.ConfirmationToken;
import com.ttt.backend.entity.auth.User;
import com.ttt.backend.repository.ConfirmationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Value("${security.confirmation_token.expiration-time}")
    private Long confirmationTokenDurationMs;
    @Autowired
    private UserService userService;


    public ConfirmationToken createConfirmationToken(User user){
        ConfirmationToken confirmationToken =
                ConfirmationToken.builder()
                    .user(user)
                    .token(UUID.randomUUID().toString())
                    .createdAt(LocalDateTime.now())
                    .expiresAt(LocalDateTime.now().plusMinutes((confirmationTokenDurationMs)/(60*60)) )
                .build();
        return confirmationTokenRepository.save(confirmationToken);
    }

    public void activeUserByToken(String token) {
        confirmationTokenRepository.findAllByToken(token)
                .map((confirmationToken) -> {
                    if(verifyExpiration()){
                        return userService.activeAccount(confirmationToken.getUser());
                    }else{
                        throw new RuntimeException("Token is expired!");
                    }
                })
                .orElseThrow(() -> new RuntimeException("Token is not found!"));
    }

    // TODO: implement method
    public boolean verifyExpiration(){
        return true;
    }


}
