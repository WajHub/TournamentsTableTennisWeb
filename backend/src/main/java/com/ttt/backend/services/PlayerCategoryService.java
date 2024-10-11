package com.ttt.backend.services;

import com.ttt.backend.models.PlayerCategory;
import com.ttt.backend.repository.PlayerCategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class PlayerCategoryService {
    private PlayerCategoryRepository playerCategoryRepository;

    public PlayerCategoryService(PlayerCategoryRepository playerCategoryRepository) {
        this.playerCategoryRepository = playerCategoryRepository;
    }

    public PlayerCategory save(PlayerCategory playerCategory){
        return playerCategoryRepository.save(playerCategory);
    }
}
