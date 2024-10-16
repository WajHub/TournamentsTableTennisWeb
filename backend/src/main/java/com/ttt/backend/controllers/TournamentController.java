package com.ttt.backend.controllers;

import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


}
