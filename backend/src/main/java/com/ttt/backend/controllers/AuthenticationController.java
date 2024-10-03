package com.ttt.backend.controllers;


import com.ttt.backend.dto.LoginUserDto;
import com.ttt.backend.dto.RegisterUserDto;
import com.ttt.backend.exception.TokenRefreshException;
import com.ttt.backend.exception.UserNotFoundException;
import com.ttt.backend.models.RefreshToken;
import com.ttt.backend.models.User;
import com.ttt.backend.payload.request.TokenRefreshRequest;
import com.ttt.backend.payload.response.JwtResponse;
import com.ttt.backend.payload.response.TokenRefreshResponse;
import com.ttt.backend.services.AuthenticationService;
import com.ttt.backend.services.JwtService;
import com.ttt.backend.services.RefreshTokenService;
import com.ttt.backend.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final RefreshTokenService refreshTokenService;

    private final UserService userService;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, RefreshTokenService refreshTokenService, UserService userService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        if(userService.existsWithEmail(registerUserDto.getEmail())) return new ResponseEntity<>("Email is already in use", HttpStatus.CONFLICT);

        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto, HttpServletResponse response) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        List<String> roles = authenticatedUser.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(authenticatedUser.getId());

        Cookie cookie = new Cookie("token", jwtToken);
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (jwtExpiration/60));

        response.addCookie(cookie);

        return ResponseEntity.ok(new JwtResponse(jwtToken, refreshToken.getToken(), authenticatedUser.getId(),
                authenticatedUser.getFullName(), authenticatedUser.getEmail(), roles));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", "NONE");
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(("Logged out successfully "+ cookie.getName()+ cookie.getValue()));
    }

    @GetMapping("/details")
    public ResponseEntity<?> getUserDetails() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String userEmail = ((UserDetails)principal).getUsername();
            Optional<User> user = this.userService.getByEmail(userEmail);
            return user.map(u -> new ResponseEntity<>(u, HttpStatus.OK))
                    .orElseThrow(() -> new UserNotFoundException("User with email " + userEmail + " not found"));
        } else {
            return new ResponseEntity<>("User is not authenticated", HttpStatus.UNAUTHORIZED);
        }
    }


    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String userEmail = ((UserDetails)principal).getUsername();
            Optional<User> user = this.userService.getByEmail(userEmail);
            if (user.isPresent()){
                String requestRefreshToken = String.valueOf(refreshTokenService.findByUser(user.get()));
                String newToken = jwtService.generateToken(user.get());
                return ResponseEntity.ok(new TokenRefreshResponse(newToken, requestRefreshToken));
            }
            else{
                throw new TokenRefreshException("Error", "");
            }
        } else {
            return new ResponseEntity<>(principal.toString(), HttpStatus.UNAUTHORIZED);
        }
    }
}