package com.ttt.backend.controllers.game;

import com.ttt.backend.dto.request.GameDtoCreate;
import com.ttt.backend.dto.request.GameResultRequest;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.models.GameState;
import com.ttt.backend.models.Player;
import com.ttt.backend.services.GameService;
import com.ttt.backend.validaton.GameResultValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public List<GameDtoResponse> games(@PathVariable Long tournamentId, @RequestParam(required = false) String state) {
        return gameService.findByTournamentId(tournamentId, state);
    }

    @Override
    public void save(@RequestBody GameDtoCreate gameDtoCreate) {
        gameService.save(gameDtoCreate);
    }


    @Override
    public void createAllGames(@PathVariable Long tournamentId) {
        gameService.createAllGames(tournamentId);
    }

    @Override
    public void setState(@PathVariable Long gameId, @RequestParam(name= "state") String state) {
        gameService.setState(gameId, GameState.valueOf(state.toUpperCase()));
    }

    @Override
    public void setResult(Long gameId,@RequestBody @GameResultValidation GameResultRequest gameResultRequest) {
        try{
            gameService.findById(gameId).ifPresentOrElse((game)->{
                gameService.setResult(game, gameResultRequest);
            },
                    () -> {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                    });
        }catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void delete(@PathVariable Long gameId) {
        gameService.findById(gameId)
                .ifPresentOrElse(
                        (game) -> gameService.deleteById(gameId),
                        () -> {
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
                        }
                );
    }
}