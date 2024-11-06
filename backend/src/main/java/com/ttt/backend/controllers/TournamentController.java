package com.ttt.backend.controllers;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.exception.TournamentNotFoundException;
import com.ttt.backend.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api")
public class TournamentController {

    private TournamentService tournamentService;


    @Autowired
    public TournamentController(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
    }

    @PostMapping("/manage/save/tournament")
    public ResponseEntity<?> save(@RequestBody TournamentDto tournamentDto){
        return ResponseEntity.ok(tournamentService.save(tournamentDto));
    }

    @GetMapping("/tournaments/{id}")
    public List<TournamentDto> findAllByEventId(@PathVariable Long id){
        return tournamentService.findAllByIdEvent(id);
    }

    @GetMapping("/tournaments/player/eligible/{id}")
    public List<PlayerDto> findAllPlayersEligible(@PathVariable Long id ){
        return tournamentService.findPlayersForTournament(id);
    }
    @PutMapping("/manage/add/player/tournament")
    public ResponseEntity<?> addPlayer(@RequestParam Long playerId, @RequestParam Long tournamentId) {
        try {
            tournamentService.addPlayerToTournament(playerId, tournamentId);
            return ResponseEntity.ok("OK");
        } catch (TournamentNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/manage/remove/player/tournament")
    public ResponseEntity<?> removePlayer(@RequestParam Long playerId, @RequestParam Long tournamentId){
        try {
            tournamentService.removePlayerFromTournament(playerId, tournamentId);
            return ResponseEntity.ok("OK");
        } catch (Exception ex) {
            return new ResponseEntity<>(ex,HttpStatus.BAD_REQUEST);
        }
    }

}
