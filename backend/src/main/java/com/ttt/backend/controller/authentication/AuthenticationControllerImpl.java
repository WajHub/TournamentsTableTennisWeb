package com.ttt.backend.controller.authentication;

import com.ttt.backend.dto.LoginUserDto;
import com.ttt.backend.dto.RegisterUserDto;
import com.ttt.backend.dto.response.JwtResponse;
import com.ttt.backend.dto.response.TokenRefreshResponse;
import com.ttt.backend.entity.auth.ConfirmationToken;
import com.ttt.backend.exception.TokenRefreshException;
import com.ttt.backend.exception.UserNotFoundException;
import com.ttt.backend.entity.auth.RefreshToken;
import com.ttt.backend.entity.auth.User;
import com.ttt.backend.service.*;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/auth")
@RestController
public class AuthenticationControllerImpl implements AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;
    private final ConfirmationTokenService confirmationTokenService;
    private final UserService userService;
    private final EmailService emailService;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    @Value("${security.refresh_jwt.expiration-time}")
    private long refreshTokenExpiration;

    public AuthenticationControllerImpl(JwtService jwtService, AuthenticationService authenticationService, RefreshTokenService refreshTokenService, ConfirmationTokenService confirmationTokenService, UserService userService, EmailService emailService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
        this.confirmationTokenService = confirmationTokenService;
        this.userService = userService;
        this.emailService = emailService;
    }

    @Override
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        if(userService.existsWithEmail(registerUserDto.getEmail())) return new ResponseEntity<>("Email is already in use", HttpStatus.CONFLICT);
        User registeredUser = authenticationService.signup(registerUserDto);
        ConfirmationToken confirmationToken = confirmationTokenService.createConfirmationToken(registeredUser);
        String subject = "Account Verification";
        String verificationLink = "http://localhost:3000/confirm_email?token=" + confirmationToken.getToken();
        String htmlMessage =
                "<html>"
                        + "<body style=\"font-family: Arial, sans-serif;\">"
                        + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                        + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                        + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                        + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                        + "<p><a href=\"" + verificationLink + "\" style=\"font-size: 18px; font-weight: bold; color: #007bff; text-decoration: none;\">Verify Your Account</a></p>"
                        + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + "</p>"
                        + "</div>"
                        + "</div>"
                        + "</body>"
                        + "</html>";

        try {
            emailService.sendVerificationEmail(registeredUser.getEmail() , subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
        return ResponseEntity.ok(confirmationToken.getToken());
    }

    @Override
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto, HttpServletResponse response, HttpServletRequest request){
        try{
            User authenticatedUser = authenticationService.authenticate(loginUserDto);
            String jwtToken = jwtService.generateToken(authenticatedUser);
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(authenticatedUser.getId());
            response.addCookie(saveToken("token", jwtToken, "/", (int) jwtExpiration));
            response.addCookie(saveToken("refresh-token", refreshToken.getToken(), "/auth/refreshtoken", (int) refreshTokenExpiration));
            return ResponseEntity.ok(new JwtResponse(jwtToken, refreshToken.getToken(), authenticatedUser));

        } catch(RuntimeException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        response.addCookie(saveToken("token", "NONE", "/", 0));
        response.addCookie(saveToken("refresh-token", "NONE", "/auth/refreshtoken", 0));
        return ResponseEntity.ok("Logged out successfully ");
    }

    @Override
    public ResponseEntity<?> getUserDetails() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String userEmail = ((UserDetails) principal).getUsername();
            Optional<User> user = this.userService.getByEmail(userEmail);
            return user.map(u -> new ResponseEntity<>(u, HttpStatus.OK))
                    .orElseThrow(() -> new UserNotFoundException("User with email " + userEmail + " not found"));
        } else {
            return new ResponseEntity<>("User is not authenticated", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<?> refreshtoken(HttpServletResponse response) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String userEmail = ((UserDetails) principal).getUsername();
            Optional<User> user = this.userService.getByEmail(userEmail);
            if (user.isPresent()) {
                String requestRefreshToken = String.valueOf(refreshTokenService.findByUser(user.get()));
                String newToken = jwtService.generateToken(user.get());
                RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.get().getId());

                response.addCookie(saveToken("token", newToken, "/", (int) jwtExpiration));
                response.addCookie(saveToken("refresh-token", newRefreshToken.getToken(), "/auth/refreshtoken", (int) refreshTokenExpiration));

                return ResponseEntity.ok(new TokenRefreshResponse(newToken, requestRefreshToken));
            } else {
                throw new TokenRefreshException("Error", "");
            }
        } else {
            return new ResponseEntity<>(principal.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<?> confirmEmail(String token) {
        confirmationTokenService.activeUserByToken(token);
        return new ResponseEntity<>("User is activated!", HttpStatus.OK);
    }

    @Override
    public Cookie saveToken(String nameOfToken, String token, String path, int expirationTime) {
        Cookie cookieToken = new Cookie(nameOfToken, token);
        cookieToken.setHttpOnly(true);
        cookieToken.setPath(path);
        cookieToken.setMaxAge(expirationTime);
        return cookieToken;
    }
}