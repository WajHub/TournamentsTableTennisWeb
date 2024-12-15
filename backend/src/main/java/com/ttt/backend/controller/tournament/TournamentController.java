package com.ttt.backend.controller.tournament;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.dto.TournamentDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
public interface TournamentController {

    @GetMapping("events/{id}/tournaments")
    @ResponseStatus(HttpStatus.OK)
    List<TournamentDto> findAllByEventId(@PathVariable Long id);

    @GetMapping("tournaments/{id}")
    @ResponseStatus(HttpStatus.OK)
    TournamentDto findAllById(@PathVariable Long id);

    @GetMapping("/tournaments/player/eligible/{id}")
    @ResponseStatus(HttpStatus.OK)
    List<PlayerDto> findAllPlayersEligible(@PathVariable Long id);

    @PostMapping("/manage/tournaments")
    @ResponseStatus(HttpStatus.CREATED)
    TournamentDto save(@RequestBody TournamentDto tournamentDto);

    @PatchMapping("/manage/tournaments/{tournamentId}/players/{playerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    TournamentDto addPlayer(@PathVariable Long tournamentId, @PathVariable Long playerId);

    @PatchMapping("/manage/tournaments/{tournamentId}/players/{playerId}/remove")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    TournamentDto removePlayer(@PathVariable Long tournamentId, @PathVariable Long playerId);

    @PatchMapping("/manage/tournaments/{tournamentId}/start")
    @ResponseStatus(HttpStatus.CREATED)
    TournamentDto startTournament(@PathVariable Long tournamentId);

    @DeleteMapping("/manage/tournament/delete/{tournamentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteTournament(@PathVariable Long tournamentId);


    /** Functions only for testing  ------------------------ **/
    @PatchMapping("/manage/tournaments/{tournamentId}/seed")
    @ResponseStatus(HttpStatus.CREATED)
    void seedPlayers(@PathVariable Long tournamentId);

    @PatchMapping("/manage/stop/{tournamentId}")
    @ResponseStatus(HttpStatus.CREATED)
    void stopTournament(@PathVariable Long tournamentId);
    /** ------------------------------------------------ **/


}