package com.ttt.backend.controller.event;

import com.ttt.backend.dto.EventDto;
import com.ttt.backend.exception.UserNotFoundException;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.model.entity.auth.User;
import com.ttt.backend.service.EventService;
import com.ttt.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@RestController
public class EventControllerImpl implements EventController {
    private final EventService eventService;
    private final UserService userService;
    private final MapperStructImpl mapperStruct;


    @Autowired
    public EventControllerImpl(EventService eventService, UserService userService, MapperStructImpl mapperStruct) {
        this.eventService = eventService;
        this.userService = userService;
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

    @Override
    public EventDto subscribeToNotifications(Long event_id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String userEmail = ((UserDetails) principal).getUsername();
            Optional<User> user = this.userService.getByEmail(userEmail);
            return eventService.saveUserForNotifications(user.get().getId(), event_id);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User is not authenticated");
        }
    }

    @Override
    public EventDto unsubscribeToNotifications(Long event_id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String userEmail = ((UserDetails) principal).getUsername();
            Optional<User> user = this.userService.getByEmail(userEmail);
            return eventService.deleteUserForNotifications(user.get().getId(), event_id);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User is not authenticated");
        }
    }
}