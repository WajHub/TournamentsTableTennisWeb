package com.ttt.backend.controllers.player;

import com.ttt.backend.dto.PlayerDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api")
public interface PlayerController {

    @PreAuthorize("hasAnyRole('MODERATOR', 'ADMIN')")
    @PostMapping("manage/player/save")
    @Transactional
    ResponseEntity<?> save(@RequestBody PlayerDto playerDto);

    @PreAuthorize("hasAnyRole('MODERATOR', 'ADMIN')")
    @DeleteMapping("manage/player/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deletePlayerById(@PathVariable Long id);

    @GetMapping("/players")
    ResponseEntity<?> findAll();
}