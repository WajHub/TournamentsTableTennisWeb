package com.ttt.backend.service;

import com.ttt.backend.dto.EventDto;
import com.ttt.backend.entity.Event;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EventService {

    private final MapperStructImpl mapperStructImpl;
    EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository, MapperStructImpl mapperStructImpl){
        this.eventRepository = eventRepository;
        this.mapperStructImpl = mapperStructImpl;
    }

    public Event save(Event event){
        return eventRepository.save(event);
    }

    public Optional<Event> findByName(String name) {return eventRepository.findByName(name);}

    public List<Event> findAll() {return eventRepository.findAll();}

    public Event findAllById(Long id){
        return eventRepository.findAllById(id);
    }

    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }

    public EventDto updateEvent(Long id, EventDto eventDto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setName(eventDto.getName());
        event.setDate(eventDto.getDate());
        Event savedEvent = eventRepository.save(event);

        return mapperStructImpl.eventToEventDto(savedEvent);
    }
}
