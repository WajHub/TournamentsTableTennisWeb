package com.ttt.backend.controller.user;

import com.ttt.backend.entity.Role;
import com.ttt.backend.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("api/admin_manage")
public interface UserController {

    @GetMapping("/users")
    @ResponseStatus(HttpStatus.OK)
    List<User> getAllUsers();

    @PatchMapping("/users/{id}/{newRole}")
    @ResponseStatus(HttpStatus.OK)
    User editRole(@PathVariable Long id, @PathVariable String newRole);

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long id);
}
