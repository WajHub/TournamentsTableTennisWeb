package com.ttt.backend.controllers.event;

import com.ttt.backend.dto.EventDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
public interface EventController {

    @PostMapping("/manage/event/save")
    ResponseEntity<?> save(@RequestBody EventDto eventDto);

    @DeleteMapping("/manage/event/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long id);

    @GetMapping("/events")
    List<EventDto> getAllEvents();

    @GetMapping("/events/{id}")
    EventDto getAllById(@PathVariable Long id);
}