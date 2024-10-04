package com.ttt.backend.controllers;

import com.ttt.backend.dto.EventDto;
import com.ttt.backend.models.Event;
import com.ttt.backend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
@RequestMapping("api/manage/event")
@RestController
public class EventController {
    private EventService eventService;
    @Autowired
    public EventController(EventService eventService){
        this.eventService = eventService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveNewEvent(@RequestBody EventDto eventDto){
        return eventService.findByName(eventDto.getName())
                .map(event ->  new ResponseEntity<>("Name "+event.getName()+" already exists!", HttpStatus.CONFLICT))
                .orElseGet(() ->{
                    Event event = new Event(eventDto);
                    eventService.save(event);
                    return ResponseEntity.ok(event.toString());
                });
    }
}
