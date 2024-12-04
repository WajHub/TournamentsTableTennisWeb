package com.ttt.backend.controllers.tournament;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.exception.TournamentNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
public interface TournamentController {

    @GetMapping("events/{id}/tournaments")
    List<TournamentDto> findAllByEventId(@PathVariable Long id);

    @GetMapping("tournaments/{id}")
    TournamentDto findAllById(@PathVariable Long id);

    @GetMapping("/tournaments/player/eligible/{id}")
    List<PlayerDto> findAllPlayersEligible(@PathVariable Long id);

    @PostMapping("/manage/save/tournament")
    ResponseEntity<?> save(@RequestBody TournamentDto tournamentDto);

    @PutMapping("/manage/tournaments/add/player")
    ResponseEntity<?> addPlayer(@RequestParam Long playerId, @RequestParam Long tournamentId);

    @PutMapping("/manage/tournaments/remove/player")
    ResponseEntity<?> removePlayer(@RequestParam Long playerId, @RequestParam Long tournamentId);

    @PatchMapping("/manage/start/{tournamentId}")
    @ResponseStatus(HttpStatus.CREATED)
    void startTournament(@PathVariable Long tournamentId);

    @PatchMapping("/manage/tournaments/{tournamentId}/seed")
    @ResponseStatus(HttpStatus.CREATED)
    void seedPlayers(@PathVariable Long tournamentId);

    @PatchMapping("/manage/stop/{tournamentId}")
    @ResponseStatus(HttpStatus.CREATED)
    void stopTournament(@PathVariable Long tournamentId);

    @DeleteMapping("/manage/tournament/delete/{tournamentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteTournament(@PathVariable Long tournamentId);
}