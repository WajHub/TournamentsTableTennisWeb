package com.ttt.backend.services;

import com.ttt.backend.models.Event;
import com.ttt.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EventService {

    EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    public Event save(Event event){
        return eventRepository.save(event);
    }

    public Optional<Event> findByName(String name) {return eventRepository.findByName(name);}

    public List<Event> findAll() {return eventRepository.findAll();}

    public Event findAllById(Long id){
        return eventRepository.findAllById(id);
    }

}
