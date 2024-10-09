package com.ttt.backend.payload.response;


import com.ttt.backend.models.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
