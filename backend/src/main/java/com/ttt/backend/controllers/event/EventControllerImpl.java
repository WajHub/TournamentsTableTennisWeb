package com.ttt.backend.controllers.event;

import com.ttt.backend.dto.EventDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> save(@RequestBody EventDto eventDto) {
        if (eventService.findByName(eventDto.getName()).isPresent())
            return new ResponseEntity<>("Event name is already in use", HttpStatus.CONFLICT);
        eventService.save(mapperStruct.createEvent(eventDto));
        return ResponseEntity.ok(eventDto.toString());
    }

    @Override
    public void delete(@PathVariable Long id) {
        eventService.deleteById(id);
    }

    @Override
    public List<EventDto> getAllEvents() {
        return eventService.findAll()
                .stream()
                .map(mapperStruct::eventToEventDto)
            .toList();
    }

    @Override
    public EventDto getAllById(@PathVariable Long id) {
        return mapperStruct.eventToEventDto(eventService.findAllById(id));
    }
}