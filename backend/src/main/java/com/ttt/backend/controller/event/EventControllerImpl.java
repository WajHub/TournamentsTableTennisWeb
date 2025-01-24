package com.ttt.backend.controller.event;

import com.ttt.backend.dto.EventDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
public class EventControllerImpl implements EventController {
    private final EventService eventService;
    private final MapperStructImpl mapperStruct;

    @Autowired
    public EventControllerImpl(EventService eventService, MapperStructImpl mapperStruct) {
        this.eventService = eventService;
        this.mapperStruct = mapperStruct;
    }

    @Override
    public EventDto save(EventDto eventDto) {
        if (eventService.findByName(eventDto.getName()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Name is taken!");
        eventService.save(mapperStruct.createEvent(eventDto));
        return eventDto;
    }

    @Override
    public List<EventDto> getAllEvents() {
        return eventService.findAll()
                .stream()
                .map(mapperStruct::eventToEventDto)
            .toList();
    }

    @Override
    public EventDto getAllById(Long id) {
        return mapperStruct.eventToEventDto(eventService.findAllById(id));
    }

    @Override
    public EventDto updateEvent(Long id, EventDto eventDto) {
        EventDto test = eventService.updateEvent(id, eventDto);
        return test;
    }

    @Override
    public void delete(Long id) {
        eventService.deleteById(id);
    }
}