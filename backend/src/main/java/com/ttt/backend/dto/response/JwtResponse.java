package com.ttt.backend.dto.response;


import com.ttt.backend.entity.auth.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String refreshToken;
    private User user;

    public JwtResponse(String accessToken, String refreshToken, User user) {
        this.token = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;

    }
}
