package com.ttt.backend.controller.authentication;

import com.ttt.backend.dto.LoginUserDto;
import com.ttt.backend.dto.RegisterUserDto;
import com.ttt.backend.dto.request.ChangePasswordRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface AuthenticationController {

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto);

    @PostMapping("/signin")
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto, HttpServletResponse response, HttpServletRequest request);

    @PostMapping("/signout")
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<?> logoutUser(HttpServletResponse response);

    @GetMapping("/details")
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<?> getUserDetails();

    @PostMapping("/refreshtoken")
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<?> refreshtoken(HttpServletResponse response);

    @PostMapping("/confirm_email")
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<?> confirmEmail(@RequestParam String token);

    @PatchMapping("/new_password")
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest);

    Cookie saveToken(String nameOfToken, String token, String Path, int expirationTime);
}