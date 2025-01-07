package com.ttt.backend.controller.game;

import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.dto.request.GameDtoRequest;
import com.ttt.backend.dto.request.GameResultRequest;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.entity.GameState;
import com.ttt.backend.service.GameService;
import com.ttt.backend.validaton.GameResultValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class GameControllerImpl implements GameController {
    private final GameService gameService;

    @Autowired
    public GameControllerImpl(GameService gameService) {
        this.gameService = gameService;
    }

    @Override
    public List<GameDtoResponse> getGames(@PathVariable Long tournamentId, @RequestParam(required = false) String state) {
        return gameService.findByTournamentId(tournamentId, state);
    }

    @Override
    public GameDtoResponse save(@RequestBody GameDtoRequest gameDtoRequest) {
        return gameService.save(gameDtoRequest);
    }

    @Override
    public TournamentDto updateResult(Long gameId, @RequestBody @GameResultValidation GameResultRequest gameResultRequest) {
        try{
            return gameService.setResult(gameService.findById(gameId), gameResultRequest);
        }catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public GameDtoResponse updateState(@PathVariable Long gameId, @RequestParam(name= "state") String state) {
        return gameService.setState(gameId, GameState.valueOf(state.toUpperCase()));
    }

    @Override
    public void delete(@PathVariable Long gameId) {
        gameService.deleteById(gameId);
    }

    @Override
    public TournamentDto sendLiveResult(@Payload TournamentDto tournamentUpdated) {
        return tournamentUpdated;
    }

    /** Functions only for testing  ------------------------ **/
    @Override
    public List<GameDtoResponse> createAllGames(@PathVariable Long tournamentId) {
        return gameService.createAllGames(tournamentId);
    }
    /** ------------------------------------------------ **/
}