package com.ttt.backend.repository;

import com.ttt.backend.entity.appModels.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Override
    Event save(Event event);

    Optional<Event> findByName(String name);

    List<Event> findAll();

    Event findAllById(Long id);

    void deleteById(Long id);
}
