package com.ttt.backend.controller.event;

import com.ttt.backend.dto.EventDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
public interface EventController {

    @PostMapping("/manage/events")
    @ResponseStatus(HttpStatus.CREATED)
    EventDto save(@RequestBody EventDto eventDto);

    @GetMapping("/events")
    @ResponseStatus(HttpStatus.OK)
    List<EventDto> getAllEvents();

    @GetMapping("/events/{id}")
    @ResponseStatus(HttpStatus.OK)
    EventDto getAllById(@PathVariable Long id);

    @DeleteMapping("/manage/events/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long id);
}