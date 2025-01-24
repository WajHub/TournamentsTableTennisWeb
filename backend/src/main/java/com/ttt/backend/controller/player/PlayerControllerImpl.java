package com.ttt.backend.controller.player;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class PlayerControllerImpl implements PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerControllerImpl(PlayerService playerService) {
        this.playerService = playerService;
    }

    @Override
    public PlayerDto save(@RequestBody PlayerDto playerDto) {
        return playerService.save(playerDto);
    }

    @Override
    public PlayerDto updatePlayer(Long id, PlayerDto playerDto) {
        return playerService.update(id, playerDto);
    }

    @Override
    public void deletePlayerById(@PathVariable Long id) {
        if (!playerService.existById(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Player not found");
        }
        playerService.deleteById(id);
    }

    @Override
    public List<PlayerDto> findAll() {
        return playerService.findAll();
    }
}