package com.ttt.backend.controller.player;

import com.ttt.backend.dto.PlayerDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
public interface PlayerController {

    @PostMapping("manage/players")
    @ResponseStatus(HttpStatus.CREATED)
    PlayerDto save(@RequestBody PlayerDto playerDto);

    @PatchMapping("manage/players/{id}")
    @ResponseStatus(HttpStatus.OK)
    PlayerDto updatePlayer(@PathVariable Long id, @RequestBody PlayerDto playerDto);

    @DeleteMapping("manage/players/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deletePlayerById(@PathVariable Long id);

    @GetMapping("/players")
    @ResponseStatus(HttpStatus.OK)
    List<PlayerDto> findAll();
}