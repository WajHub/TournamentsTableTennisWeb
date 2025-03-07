package com.ttt.backend.controller.user;

import com.ttt.backend.dto.request.ChangePasswordRequest;
import com.ttt.backend.model.enums.Role;
import com.ttt.backend.model.entity.auth.User;
import com.ttt.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class UserControllerImpl implements  UserController{

    private final UserService userService;

    @Autowired
    public UserControllerImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @Override
    public User editRole(Long id, String newRole) {
        System.out.println(newRole);
        Role role = Role.valueOf(newRole);
        return userService.editRole(id, role);
    }

    @Override
    public void delete(Long id) {
        userService.delete(id);
    }

}
