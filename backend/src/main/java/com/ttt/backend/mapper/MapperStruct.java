package com.ttt.backend.mapper;

import com.ttt.backend.dto.*;
import com.ttt.backend.dto.request.GameDtoRequest;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.dto.response.PlayerDtoResponseInGame;
import com.ttt.backend.model.entity.*;

import java.util.List;

public interface MapperStruct {
    Event createEvent(EventDto eventDto);

    EventDto eventToEventDto(Event event);

    Player createPlayer(PlayerDto playerDto);

    CategoryDto categoryToCategoryDto(Category category);

    PlayerCategoryDto playerCategoryToPlayerCategoryDto(PlayerCategory playerCategory);

    PlayerDto playerToPlayerDto(Player player);

    PlayerDto playerToPlayerDto(Player player, Category category);

    PlayerDto playerToPlayerDto(Player player, List<PlayerCategoryDto> playerCategoryDtoList);

    PlayerDtoResponseInGame playerToPlayerDtoResponseInGame(Player player, boolean isWinner, String resultText);

    Tournament tournamentDtoToTournament(TournamentDto tournamentDto, Event event, Category category);

    TournamentDto tournamentToTournamentDto(Tournament tournament);

    Game createNewGame(GameDtoRequest gameDtoRequest, Tournament tournament, Long idNextMatch);

    GameDtoResponse gameToGameDtoResponse(Game game);

}
