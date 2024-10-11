package com.ttt.backend.repository;

import com.ttt.backend.models.PlayerCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerCategoryRepository extends JpaRepository<PlayerCategory, Long> {
    @Override
    PlayerCategory save(PlayerCategory playerCategory);
}
