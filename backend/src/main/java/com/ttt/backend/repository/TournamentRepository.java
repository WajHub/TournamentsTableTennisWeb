package com.ttt.backend.repository;

import com.ttt.backend.model.entity.Event;
import com.ttt.backend.model.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {

    public Tournament save(Tournament tournament);

    List<Tournament> findAllByEvent(Event event);

}
