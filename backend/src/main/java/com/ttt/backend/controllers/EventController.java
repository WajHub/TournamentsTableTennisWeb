package com.ttt.backend.controllers;

import com.ttt.backend.dto.EventDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Event;
import com.ttt.backend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api")
@RestController
public class EventController {
    private EventService eventService;
    private MapperStructImpl mapperStruct;
    @Autowired
    public EventController(EventService eventService, MapperStructImpl mapperStruct){
        this.eventService = eventService;
        this.mapperStruct = mapperStruct;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    @PostMapping("/manage/event/save")
    public ResponseEntity<?> save(@RequestBody EventDto eventDto){
        if (eventService.findByName(eventDto.getName()).isPresent())
            return new ResponseEntity<>("Event name is already in use", HttpStatus.CONFLICT);
        eventService.save(mapperStruct.createEvent(eventDto));
        return ResponseEntity.ok(eventDto.toString());
    }

    // TODO: Implement deleting event
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    @DeleteMapping("/manage/event/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok("");
    }

    @GetMapping("/events")
    public List<EventDto> getAllEvents(){
        return eventService.findAll()
                .stream()
                .map((event) ->
                        mapperStruct.eventToEventDto(event))
                .toList();
    }

    @GetMapping("/event/{id}")
    public EventDto getAllById(@PathVariable Long id){
        return mapperStruct.eventToEventDto(eventService.findAllById(id));
    }


}
