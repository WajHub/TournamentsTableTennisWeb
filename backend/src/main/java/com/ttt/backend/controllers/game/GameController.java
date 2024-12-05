package com.ttt.backend.controllers.game;

import com.ttt.backend.dto.request.GameDtoCreate;
import com.ttt.backend.dto.request.GameResultRequest;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.validaton.GameResultValidation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
public interface GameController {

    @GetMapping("/games/tournaments/{tournamentId}")
    @ResponseStatus(HttpStatus.OK)
    List<GameDtoResponse> games(@PathVariable Long tournamentId, @RequestParam(required = false) String state);

    @PostMapping("/manage/game/save")
    @ResponseStatus(HttpStatus.CREATED)
    void save(@RequestBody GameDtoCreate gameDtoCreate);

    @PostMapping("/manage/games/create/{tournamentId}")
    @ResponseStatus(HttpStatus.CREATED)
    void createAllGames(@PathVariable Long tournamentId);

    @PatchMapping("/manage/games/{gameId}")
    @ResponseStatus(HttpStatus.CREATED)
    void setState(@PathVariable Long gameId, @RequestParam(name= "state") String state);

    @PatchMapping("/manage/games/{gameId}/result")
    @ResponseStatus(HttpStatus.CREATED)
    void setResult(@PathVariable Long gameId, @RequestBody @GameResultValidation GameResultRequest gameResultRequest);

    @DeleteMapping("/manage/game/delete/{gameId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long gameId);

}