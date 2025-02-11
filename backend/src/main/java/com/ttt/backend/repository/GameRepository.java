package com.ttt.backend.repository;

import com.ttt.backend.model.entity.Game;
import com.ttt.backend.model.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findAllByTournament(Tournament tournament);
}
