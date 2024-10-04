package com.ttt.backend.repository;

import com.ttt.backend.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Override
    Event save(Event event);
}
