package com.ttt.backend.mapper;

import com.ttt.backend.models.Event;
import com.ttt.backend.dto.EventDto;
public interface MapperStruct {
    Event createEvent(EventDto eventDto);

    EventDto eventToEventDto(Event event);
}
