package com.ttt.backend.controllers.player;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Category;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.PlayerCategory;
import com.ttt.backend.services.CategoryService;
import com.ttt.backend.services.PlayerCategoryService;
import com.ttt.backend.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class PlayerControllerImpl implements PlayerController {
    private final PlayerService playerService;
    private final CategoryService categoryService;
    private final PlayerCategoryService playerCategoryService;
    private final MapperStructImpl mapperStruct;

    @Autowired
    public PlayerControllerImpl(PlayerService playerService, CategoryService categoryService, PlayerCategoryService playerCategoryService, MapperStructImpl mapperStruct) {
        this.playerService = playerService;
        this.categoryService = categoryService;
        this.playerCategoryService = playerCategoryService;
        this.mapperStruct = mapperStruct;
    }

    @Override
    public ResponseEntity<?> save(@RequestBody PlayerDto playerDto) {
        Player player = mapperStruct.createPlayer(playerDto);
        List<Category> categoryList = categoryService.findAll().stream()
                .filter(category -> category.getGender().equals(player.getGender()) && category.getAgeLimit() >= player.getAge())
                .toList();
        playerService.save(player);

        categoryList.forEach(category -> {
            PlayerCategory playerCategory = PlayerCategory.builder()
                    .category(category)
                    .player(player)
                    .points(0)
                    .build();
            playerCategoryService.save(playerCategory);
        });
        return ResponseEntity.ok(player);
    }

    @Override
    public void deletePlayerById(@PathVariable Long id) {
        if (!playerService.existById(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Player not found");
        }
        playerService.deleteById(id);
    }

    @Override
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(playerService.findAll());
    }
}