package com.ttt.backend.mapper;

import com.ttt.backend.dto.*;
import com.ttt.backend.dto.request.GameDtoRequest;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.dto.response.PlayerDtoResponseInGame;
import com.ttt.backend.model.entity.*;
import com.ttt.backend.model.enums.GameState;
import org.springframework.stereotype.Component;

import java.util.*;

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
    public PlayerDto playerToPlayerDto(Player player, Category category) {
        return PlayerDto.builder()
                .id(player.getId())
                .firstname(player.getFirstname())
                .lastname(player.getLastname())
                .gender(player.getGender())
                .date(player.getBirthday())
                .playerCategoryDtoList(
                        player.getPlayerCategoryList()
                            .stream()
                                .filter((playerCategory -> Objects.equals(playerCategory.getCategory().getId(), category.getId())))
                                .toList()
                            .stream()
                                .map(this::playerCategoryToPlayerCategoryDto).toList()
                )
                .build();
    }

    @Override
    public PlayerDto playerToPlayerDto(Player player, List<PlayerCategoryDto> playerCategoryDtoList) {
        PlayerDto playerDto = playerToPlayerDto(player);
        playerDto.setPlayerCategoryDtoList(playerCategoryDtoList);
        return playerDto;
    }

    @Override
    public PlayerDtoResponseInGame playerToPlayerDtoResponseInGame(Player player, boolean isWinner, String resultText) {
        return PlayerDtoResponseInGame.builder()
                .id(player.getId())
                .name(player.getFirstname()+" "+player.getLastname())
                .winner(isWinner)
                .resultText(resultText)
                .build();
    }

    @Override
    public Tournament tournamentDtoToTournament(TournamentDto tournamentDto, Event event, Category category) {
        return Tournament.builder()
                .name(tournamentDto.getName())
                .event(event)
                .category(category)
                .isRunning(tournamentDto.isRunning())
                .playerList(new ArrayList<>())
                .games(new ArrayList<>())
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
                                .map((player) -> this.playerToPlayerDto(player, tournament.getCategory()))
                            .toList()
                )
                .games(tournament.getGames()
                        .stream()
                            .map(this::gameToGameDtoResponse)
                        .toList())
                .build();
    }

    @Override
    public Game createNewGame(GameDtoRequest gameDtoRequest, Tournament tournament, Long idNextMatch) {
        return Game.builder()
                .tournament(tournament)
                .round(gameDtoRequest.getRound())
                .state(GameState.valueOf("CREATED"))
                .nextMatchId(idNextMatch)
                .build();
    }

    @Override
    public GameDtoResponse gameToGameDtoResponse(Game game) {
        List<PlayerDtoResponseInGame> participants = new ArrayList<>();
        if (game.getPlayerHome() != null) {
            boolean isWinner = false;
            if(game.getPlayerWinner()!=null) isWinner = (Objects.equals(game.getPlayerWinner().getId(), game.getPlayerHome().getId()));
            String resultText = game.getState() == GameState.DONE ? String.valueOf(game.getSetsHome()) : "";
            participants.add(playerToPlayerDtoResponseInGame(game.getPlayerHome(), isWinner, resultText));
        }

        if (game.getPlayerAway() != null) {
            boolean isWinner = false;
            if(game.getPlayerWinner()!=null) isWinner = (Objects.equals(game.getPlayerWinner().getId(), game.getPlayerAway().getId()));
            String resultText = game.getState() == GameState.DONE ? String.valueOf(game.getSetsAway()) : "";
            participants.add(playerToPlayerDtoResponseInGame(game.getPlayerAway(), isWinner, resultText));
        }


        return GameDtoResponse.builder()
                .id(game.getId())
                .tournamentId(game.getTournament().getId())
                .name("")
                .nextMatchId(game.getNextMatchId())
                .tournamentRoundText(String.valueOf(game.getRound()))
                .startTime("")
                .state(String.valueOf(game.getState()))
                .participants(participants)
                .build();
    }

}
