package com.ttt.backend.services;

import com.ttt.backend.dto.PlayerCategoryDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Category;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.PlayerCategory;
import com.ttt.backend.repository.PlayerCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerCategoryService {
    private PlayerCategoryRepository playerCategoryRepository;
    private MapperStructImpl mapperStruct;

    public PlayerCategoryService(PlayerCategoryRepository playerCategoryRepository, MapperStructImpl mapperStruct) {
        this.playerCategoryRepository = playerCategoryRepository;
        this.mapperStruct = mapperStruct;
    }

    public PlayerCategory save(PlayerCategory playerCategory){
        return playerCategoryRepository.save(playerCategory);
    }

    public List<Category> findByPlayer(Player player) {
        List<PlayerCategory> test = playerCategoryRepository.findAllByPlayer(player);
        return test.stream().map(PlayerCategory::getCategory).toList();
    }


    public List<PlayerCategory> findAllByPlayer(Player player){
        return playerCategoryRepository.findAllByPlayer(player);
    }

    public List<PlayerCategoryDto> findPlayerCategoriesDto (Player player){
        return findAllByPlayer(player)
                .stream()
                .map(playerCategory ->
                        mapperStruct.playerCategoryToPlayerCategoryDto(playerCategory)
                )
                .toList();
    }
}
