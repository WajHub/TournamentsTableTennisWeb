package com.ttt.backend.mapper;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.models.Event;
import com.ttt.backend.dto.EventDto;
import com.ttt.backend.models.Player;

public interface MapperStruct {
    Event createEvent(EventDto eventDto);

    EventDto eventToEventDto(Event event);

    Player createPlayer(PlayerDto playerDto);
}
