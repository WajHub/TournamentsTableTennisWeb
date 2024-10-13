package com.ttt.backend.services;

import com.ttt.backend.models.Category;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.PlayerCategory;
import com.ttt.backend.repository.PlayerCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerCategoryService {
    private PlayerCategoryRepository playerCategoryRepository;

    public PlayerCategoryService(PlayerCategoryRepository playerCategoryRepository) {
        this.playerCategoryRepository = playerCategoryRepository;
    }

    public PlayerCategory save(PlayerCategory playerCategory){
        return playerCategoryRepository.save(playerCategory);
    }

    public List<Category> findByPlayerId(Player player) {
        List<PlayerCategory> test = playerCategoryRepository.findAllBy();
        System.out.println("test");
        return null;
    }

    public List<PlayerCategory> findAll(){
        return playerCategoryRepository.findAll();
    }

    public List<PlayerCategory> findAllByPlayer(Player player){
        return playerCategoryRepository.findAllByPlayer(player);
    }
}
