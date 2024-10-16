package com.ttt.backend.mapper;

import com.ttt.backend.dto.*;
import com.ttt.backend.models.*;

public interface MapperStruct {
    Event createEvent(EventDto eventDto);

    EventDto eventToEventDto(Event event);

    Player createPlayer(PlayerDto playerDto);

    CategoryDto categoryToCategoryDto(Category category);

    PlayerCategoryDto playerCategoryToPlayerCategoryDto(PlayerCategory playerCategory);

    PlayerDto playerToPlayerDto(Player player);

    Tournament tournamentDtoToTournament(TournamentDto tournamentDto, Event event, Category category);

    TournamentDto tournamentToTournamentDto(Tournament tournament);

}
