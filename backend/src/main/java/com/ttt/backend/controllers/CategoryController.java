package com.ttt.backend.controllers;

import com.ttt.backend.models.Category;
import com.ttt.backend.models.Player;
import com.ttt.backend.services.CategoryService;
import com.ttt.backend.services.PlayerCategoryService;
import com.ttt.backend.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api")
@RestController
public class CategoryController {

    private CategoryService categoryService;

    private PlayerCategoryService playerCategoryService;
    private PlayerService playerService;

    @Autowired
    public CategoryController(CategoryService categoryService, PlayerCategoryService playerCategoryService, PlayerService playerService) {
        this.categoryService = categoryService;
        this.playerCategoryService = playerCategoryService;
        this.playerService = playerService;
    }

    @GetMapping("/categories")
    public List<Category> findAll(){
        return categoryService.findAll();
    }

    @GetMapping("/categoriesPlayer")
    public List<Category> findByPlayerId(@RequestParam(name = "playerId") Long idPlayer){
        Optional<Player> player = playerService.findById(idPlayer);
        if(player.isEmpty()) return new ArrayList<>();
        List<Category> list = playerCategoryService.findByPlayerId(player.get());
//        System.out.println(list);
        return null;
    }
}
