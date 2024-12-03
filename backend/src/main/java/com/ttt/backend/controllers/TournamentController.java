package com.ttt.backend.controllers;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.exception.TournamentNotFoundException;
import com.ttt.backend.mapper.MapperStruct;
import com.ttt.backend.services.GameService;
import com.ttt.backend.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api")
public class TournamentController {

    private final MapperStruct mapperStruct;
    private TournamentService tournamentService;
    private GameService gameService;


    @Autowired
    public TournamentController(TournamentService tournamentService, GameService gameService, MapperStruct mapperStruct) {
        this.tournamentService = tournamentService;
        this.mapperStruct = mapperStruct;
        this.gameService = gameService;
    }

    @PostMapping("/manage/save/tournament")
    public ResponseEntity<?> save(@RequestBody TournamentDto tournamentDto){
        return ResponseEntity.ok(tournamentService.save(tournamentDto));
    }

    @GetMapping("events/{id}/tournaments")
    public List<TournamentDto> findAllByEventId(@PathVariable Long id){
        return tournamentService.findAllByIdEvent(id);
    }


    @GetMapping("tournaments/{id}")
    public TournamentDto findAllById(@PathVariable Long id) {
        return tournamentService.findById(id)
                .map(mapperStruct::tournamentToTournamentDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament has not been found!"));
    }


    @GetMapping("/tournaments/player/eligible/{id}")
    public List<PlayerDto> findAllPlayersEligible(@PathVariable Long id ){
        return tournamentService.findPlayersForTournament(id);
    }
    @PutMapping("/manage/tournaments/add/player")
    public ResponseEntity<?> addPlayer(@RequestParam Long playerId, @RequestParam Long tournamentId) {
        tournamentService.findById(tournamentId).ifPresentOrElse(
                ((tournament)-> {
                    if(tournament.isRunning())
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tournament is already running!");
                }),
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        try {
            tournamentService.addPlayerToTournament(playerId, tournamentId);
            return ResponseEntity.ok("OK");
        } catch (TournamentNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/manage/tournaments/remove/player")
    public ResponseEntity<?> removePlayer(@RequestParam Long playerId, @RequestParam Long tournamentId){
        try {
            tournamentService.removePlayerFromTournament(playerId, tournamentId);
            return ResponseEntity.ok("OK");
        } catch (Exception ex) {
            return new ResponseEntity<>(ex,HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/manage/start/{tournamentId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void startTournament(@PathVariable Long tournamentId){
        gameService.createAllGames(tournamentId);
        tournamentService.startTournament(tournamentId);
    }

    /** ADD players to matches in round 1 **/
    @PatchMapping("/manage/tournaments/{tournamentId}/seed")
    @ResponseStatus(HttpStatus.CREATED)
    public void seedPlayers(@PathVariable Long tournamentId){
        tournamentService.findById(tournamentId).ifPresentOrElse(
                (tournament -> {
                    System.out.println("TEST");
                    tournamentService.snakeSeed(tournament);
                }),
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament has not found!")
        );
    }

    /** Only develop usage **/
    @PatchMapping("/manage/stop/{tournamentId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void stopTournament(@PathVariable Long tournamentId){
        tournamentService.findById(tournamentId)
                .ifPresentOrElse(
                        (tournament -> {
                            tournament.setRunning(false);
                            tournamentService.save(tournament);
                        }),
                        () -> {
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                        }
                );
    }

    @DeleteMapping("/manage/tournament/delete/{tournamentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTournament(@PathVariable Long tournamentId){
        tournamentService.findById(tournamentId)
                .ifPresentOrElse(
                        (tournament) -> {
                            tournamentService.delete(tournament);
                        },
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                        }
                );
    }

}
