package com.ttt.backend.repository;

import com.ttt.backend.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Override
    Player save (Player player);

    Optional<Player> findById(Long id);
}
