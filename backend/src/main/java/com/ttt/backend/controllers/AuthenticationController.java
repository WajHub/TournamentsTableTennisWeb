package com.ttt.backend.controllers;


import com.ttt.backend.dto.LoginUserDto;
import com.ttt.backend.dto.RegisterUserDto;
import com.ttt.backend.exception.TokenRefreshException;
import com.ttt.backend.models.RefreshToken;
import com.ttt.backend.models.User;
import com.ttt.backend.payload.request.TokenRefreshRequest;
import com.ttt.backend.payload.request.response.JwtResponse;
import com.ttt.backend.payload.request.response.TokenRefreshResponse;
import com.ttt.backend.services.AuthenticationService;
import com.ttt.backend.services.JwtService;
import com.ttt.backend.services.RefreshTokenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final RefreshTokenService refreshTokenService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, RefreshTokenService refreshTokenService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        List<String> roles = authenticatedUser.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(authenticatedUser.getId());

        return ResponseEntity.ok(new JwtResponse(jwtToken, refreshToken.getToken(), authenticatedUser.getId(),
                authenticatedUser.getUsername(), authenticatedUser.getEmail(), roles));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtService.generateToken(user);
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }
}