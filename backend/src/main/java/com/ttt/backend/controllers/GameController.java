package com.ttt.backend.controllers;

import com.ttt.backend.dto.request.GameDtoCreate;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.models.Game;
import com.ttt.backend.models.GameState;
import com.ttt.backend.services.GameService;
import com.ttt.backend.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("api")
public class GameController {
    private GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/manage/game/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody GameDtoCreate gameDtoCreate){
        gameService.save(gameDtoCreate);
    }

    @DeleteMapping("/manage/game/delete/{gameId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long gameId){
        gameService.findById(gameId)
                .ifPresentOrElse(
                        (game) ->gameService.deleteById(gameId),
                        () -> {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
                        }
                );
    }

    /** Create all games in tournament (entire Tournament Bracket) **/
    @PostMapping("/manage/games/create/{tournamentId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAllGames(@PathVariable Long tournamentId){
        gameService.createAllGames(tournamentId);
    }

    @GetMapping("/games/tournaments/{tournamentId}")
    @ResponseStatus(HttpStatus.OK)
    public List<GameDtoResponse> games(@PathVariable Long tournamentId,
                                       @RequestParam(required = false) String state){
        return gameService.findByTournamentId(tournamentId, state);
    }

    @PatchMapping("/manage/games/{gameId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void setState(@PathVariable Long gameId,
                         @RequestParam(name= "state") String state){
        gameService.setState(gameId, GameState.valueOf(state.toUpperCase()));
    }

}
