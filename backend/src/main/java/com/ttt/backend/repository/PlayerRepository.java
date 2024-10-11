package com.ttt.backend.repository;

import com.ttt.backend.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Override
    Player save (Player player);
}
