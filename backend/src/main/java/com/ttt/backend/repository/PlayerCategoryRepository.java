package com.ttt.backend.repository;

import com.ttt.backend.entity.appModels.Player;
import com.ttt.backend.entity.appModels.PlayerCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerCategoryRepository extends JpaRepository<PlayerCategory, Long> {
    @Override
    PlayerCategory save(PlayerCategory playerCategory);
    List<PlayerCategory> findAllBy();
    List<PlayerCategory> findAllByPlayer(Player player);
}
