package com.ttt.backend.controllers;

import com.ttt.backend.dto.CategoryDto;
import com.ttt.backend.dto.PlayerCategoryDto;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api")
public class PlayerController {
    private PlayerService playerService;
    private CategoryService categoryService;
    private PlayerCategoryService playerCategoryService;
    private MapperStructImpl mapperStruct;

    @Autowired
    public PlayerController(PlayerService playerService, CategoryService categoryService, PlayerCategoryService playerCategoryService, MapperStructImpl mapperStruct) {
        this.playerService = playerService;
        this.categoryService = categoryService;
        this.playerCategoryService = playerCategoryService;
        this.mapperStruct = mapperStruct;
    }

    @PreAuthorize("hasAnyRole('MODERATOR', 'ADMIN')")
    @PostMapping("manage/player/save")
    @Transactional
    public ResponseEntity<?> save(@RequestBody PlayerDto playerDto){
        Player player = mapperStruct.createPlayer(playerDto);
        List<Category> categoryList = categoryService.findAll().stream()
                .filter((category ->
                    category.getGender().equals(player.getGender()) &&
                    category.getAgeLimit()>=player.getAge()
                )).toList();
        playerService.save(player);

        categoryList.forEach((category -> {
            PlayerCategory playerCategory = PlayerCategory.builder()
                    .category(category)
                    .player(player)
                    .points(0)
                .build();
            playerCategoryService.save(playerCategory);
        }));
        return ResponseEntity.ok(player);
    }

    @PreAuthorize("hasAnyRole('MODERATOR', 'ADMIN')")
    @DeleteMapping("manage/player/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<?> deletePlayerById(@PathVariable Long id){
        if(!playerService.existById(id)) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        playerService.deleteById(id);
        return ResponseEntity.ok("Player deleted!");
    }

    @GetMapping("/players")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(playerService.findAll());
    }
}
