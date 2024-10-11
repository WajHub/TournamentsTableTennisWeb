package com.ttt.backend.mapper;

import com.ttt.backend.dto.EventDto;
import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.models.Event;
import com.ttt.backend.models.Player;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class MapperStructImpl implements MapperStruct{
    @Override
    public Event createEvent(EventDto eventDto) {
        return Event.builder()
                .name(eventDto.getName())
                .date(eventDto.getDate())
                .tournaments(new ArrayList<>())
                .build();
    }

    @Override
    public EventDto eventToEventDto(Event event) {
        return EventDto.builder()
                .name(event.getName())
                .date(event.getDate())
                .build();
    }

    @Override
    public Player createPlayer(PlayerDto playerDto) {
        return Player.builder()
                .firstname(playerDto.getFirstname())
                .lastname(playerDto.getLastname())
                .gender(playerDto.getGender())
                .birthday(playerDto.getDate())
                .playerCategoryList(new ArrayList<>())
                .build();
    }
}
