package com.ttt.backend.repository;

import com.ttt.backend.models.Category;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.PlayerCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerCategoryRepository extends JpaRepository<PlayerCategory, Long> {
    @Override
    PlayerCategory save(PlayerCategory playerCategory);
    List<PlayerCategory> findAllBy();
    List<PlayerCategory> findAllByPlayer(Player player);
}
