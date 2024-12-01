package com.ttt.backend.mapper;

import com.ttt.backend.dto.*;
import com.ttt.backend.dto.request.GameDtoCreate;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.dto.response.PlayerDtoResponseInGame;
import com.ttt.backend.models.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
                .id(event.getId())
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
                .playerCategoryList(new HashSet<>())
                .tournamentList((new ArrayList<>()))
                .build();
    }

    @Override
    public CategoryDto categoryToCategoryDto(Category category) {
        return CategoryDto.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .categoryType(category.getType().name())
                    .ageLimit(category.getAgeLimit())
                    .gender(category.getGender().name())
                .build();
    }

    @Override
    public PlayerCategoryDto playerCategoryToPlayerCategoryDto(PlayerCategory playerCategory) {
        CategoryDto categoryDto =
                this.categoryToCategoryDto(playerCategory.getCategory());

        return PlayerCategoryDto.builder()
                .id(playerCategory.getId())
                .points(playerCategory.getPoints())
                .categoryDto(categoryDto)
                .build();
    }

    @Override
    public PlayerDto playerToPlayerDto(Player player) {
       return PlayerDto.builder()
                   .id(player.getId())
                   .firstname(player.getFirstname())
                   .lastname(player.getLastname())
                   .gender(player.getGender())
                   .date(player.getBirthday())
               .build();
    }

    @Override
    public PlayerDto playerToPlayerDto(Player player, List<PlayerCategoryDto> playerCategoryDtoList) {
        PlayerDto playerDto = playerToPlayerDto(player);
        playerDto.setPlayerCategoryDtoList(playerCategoryDtoList);
        return playerDto;
    }

    @Override
    public PlayerDtoResponseInGame playerToPlayerDtoResponseInGame(Player player) {
        return PlayerDtoResponseInGame.builder()
                .id(player.getId())
                .name(player.getFirstname()+" "+player.getLastname())
                .build();
    }

    @Override
    public Tournament tournamentDtoToTournament(TournamentDto tournamentDto, Event event, Category category) {
        return Tournament.builder()
                .name(tournamentDto.getName())
                .event(event)
                .category(category)
                .isRunning(tournamentDto.isRunning())
                .build();
    }

    @Override
    public TournamentDto tournamentToTournamentDto(Tournament tournament) {
        return TournamentDto.builder()
                .id(tournament.getId())
                .name(tournament.getName())
                .category(tournament.getCategory().getName())
                .event_id(tournament.getEvent().getId())
                .isRunning(tournament.isRunning())
                .playerDtoList(
                        tournament.getPlayerList()
                            .stream()
                                .map(this::playerToPlayerDto)
                            .toList()
                )
                .games(tournament.getGames()
                        .stream()
                            .map(this::gameToGameDtoResponse)
                        .toList())
                .build();
    }

    @Override
    public Game createNewGame(GameDtoCreate gameDtoCreate, Tournament tournament, Long idNextMatch) {
        return Game.builder()
                .tournament(tournament)
                .round(gameDtoCreate.getRound())
                .state("SCHEDULED")
                .nextMatchId(idNextMatch)
                .build();
    }

    @Override
    public GameDtoResponse gameToGameDtoResponse(Game game) {
        List<PlayerDtoResponseInGame> participants = new ArrayList<>();
        if (game.getPlayerHome() != null) {
            participants.add(playerToPlayerDtoResponseInGame(game.getPlayerHome()));
        } else {
            participants.add(null);
        }

        if (game.getPlayerAway() != null) {
            participants.add(playerToPlayerDtoResponseInGame(game.getPlayerAway()));
        } else {
            participants.add(null);
        }

        return GameDtoResponse.builder()
                .id(game.getId())
                .name("")
                .nextMatchId(game.getNextMatchId())
                .tournamentRoundText(String.valueOf(game.getRound()))
                .startTime("")
                .state(game.getState())
                .participants(participants)
                .build();
    }




}
