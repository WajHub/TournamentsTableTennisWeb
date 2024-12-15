package com.ttt.backend.controller.game;

import com.ttt.backend.dto.request.GameDtoRequest;
import com.ttt.backend.dto.request.GameResultRequest;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.validaton.GameResultValidation;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
public interface GameController {

    @GetMapping("/tournaments/{tournamentId}/games")
    @ResponseStatus(HttpStatus.OK)
    List<GameDtoResponse> getGames(@PathVariable Long tournamentId, @RequestParam(required = false) String state);

    @PostMapping("/manage/games")
    @ResponseStatus(HttpStatus.CREATED)
    GameDtoResponse save(@RequestBody GameDtoRequest gameDtoRequest);

    @PatchMapping("/manage/games/{gameId}/results")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    GameDtoResponse updateResult(@PathVariable Long gameId, @RequestBody @GameResultValidation GameResultRequest gameResultRequest);

    @PatchMapping("/manage/games/{gameId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    GameDtoResponse updateState(@PathVariable Long gameId, @RequestParam(name= "state") String state);

    @DeleteMapping("/manage/games/{gameId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long gameId);

    @MessageMapping("/hello")
    @SendTo("/topic/events/{eventId}")
    String greeting(String hello);

    /** Functions only for testing  ------------------------ **/
    @PostMapping("/manage/tournaments/{tournamentId}/games")
    @ResponseStatus(HttpStatus.CREATED)
    List<GameDtoResponse> createAllGames(@PathVariable Long tournamentId);
    /** ------------------------------------------------ **/
}