package com.ttt.backend.repository;

import com.ttt.backend.models.Event;
import com.ttt.backend.models.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {

    public Tournament save(Tournament tournament);

    List<Tournament> findAllByEvent(Event event);

}
