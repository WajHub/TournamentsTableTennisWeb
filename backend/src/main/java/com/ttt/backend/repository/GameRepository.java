package com.ttt.backend.repository;

import com.ttt.backend.entity.appModels.Game;
import com.ttt.backend.entity.appModels.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findAllByTournament(Tournament tournament);
}
