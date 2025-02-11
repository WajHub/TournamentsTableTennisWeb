package com.ttt.backend.controller.user;

import com.ttt.backend.dto.request.ChangePasswordRequest;
import com.ttt.backend.model.entity.auth.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("api")
public interface UserController {

    @GetMapping("/admin_manage/users")
    @ResponseStatus(HttpStatus.OK)
    List<User> getAllUsers();

    @PatchMapping("/admin_manage/users/{id}/{newRole}")
    @ResponseStatus(HttpStatus.OK)
    User editRole(@PathVariable Long id, @PathVariable String newRole);

    @DeleteMapping("/admin_manage/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long id);


}
