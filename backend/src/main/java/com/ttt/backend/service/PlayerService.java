package com.ttt.backend.service;

import com.ttt.backend.dto.PlayerCategoryDto;
import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.entity.Category;
import com.ttt.backend.entity.Player;
import com.ttt.backend.entity.PlayerCategory;
import com.ttt.backend.repository.CategoryRepository;
import com.ttt.backend.repository.PlayerCategoryRepository;
import com.ttt.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final PlayerCategoryRepository playerCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final PlayerCategoryService playerCategoryService;
    private final MapperStructImpl mapperStructImpl;

    @Autowired
    public PlayerService(PlayerRepository playerRepository, CategoryRepository categoryRepository, PlayerCategoryRepository playerCategoryRepository, PlayerCategoryService playerCategoryService, MapperStructImpl mapperStruct) {
        this.playerRepository = playerRepository;
        this.categoryRepository = categoryRepository;
        this.playerCategoryRepository = playerCategoryRepository;
        this.playerCategoryService = playerCategoryService;
        this.mapperStructImpl = mapperStruct;
    }

    public PlayerDto save(PlayerDto playerDto){
        Player player = mapperStructImpl.createPlayer(playerDto);
        List<Category> categoryList = categoryRepository.findAll().stream()
                .filter(category -> category.getGender().equals(player.getGender()) && category.getAgeLimit() >= player.getAge())
                .toList();
        playerRepository.save(player);

        categoryList.forEach(category -> {
            PlayerCategory playerCategory = PlayerCategory.builder()
                    .category(category)
                    .player(player)
                    .points(0)
                    .build();
            playerCategoryRepository.save(playerCategory);
        });
        return mapperStructImpl.playerToPlayerDto(player, playerCategoryService.findPlayerCategoriesDto(player));
    }

    public List<PlayerDto> findAll() {
       return playerRepository.findAll()
                .stream()
                .map(player ->  mapperStructImpl.playerToPlayerDto(player, playerCategoryService.findPlayerCategoriesDto(player)))
                .toList();
    }

    public  List<Category> findAllCategories (Player player) {
        return playerCategoryService.findByPlayer(player);
    }


    public boolean existById(Long id){
        return playerRepository.existsById(id);
    }

    public void deleteById(Long id){
        playerRepository.deleteById(id);
    }
}
