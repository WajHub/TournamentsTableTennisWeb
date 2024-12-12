package com.ttt.backend.controller.tournament;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.exception.TournamentNotFoundException;
import com.ttt.backend.mapper.MapperStruct;
import com.ttt.backend.service.GameService;
import com.ttt.backend.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
public class TournamentControllerImpl implements TournamentController {

    private final MapperStruct mapperStruct;
    private final TournamentService tournamentService;
    private final GameService gameService;

    @Autowired
    public TournamentControllerImpl(TournamentService tournamentService, GameService gameService, MapperStruct mapperStruct) {
        this.tournamentService = tournamentService;
        this.mapperStruct = mapperStruct;
        this.gameService = gameService;
    }

    @Override
    public List<TournamentDto> findAllByEventId(@PathVariable Long id) {
        return tournamentService.findAllByIdEvent(id);
    }

    @Override
    public TournamentDto findAllById(@PathVariable Long id) {
        return tournamentService.findById(id)
                .map(mapperStruct::tournamentToTournamentDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament has not been found!"));
    }

    @Override
    public List<PlayerDto> findAllPlayersEligible(@PathVariable Long id) {
        return tournamentService.findById(id)
                .map((tournamentService::findPlayersForTournament))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament has not been found!"));
    }

    @Override
    public TournamentDto save(@RequestBody TournamentDto tournamentDto) {
        return tournamentService.save(tournamentDto);
    }

    @Override
    public TournamentDto addPlayer(@PathVariable Long playerId, @PathVariable Long tournamentId) {
        tournamentService.findById(tournamentId).ifPresentOrElse(
                (tournament) -> {
                    if (tournament.isRunning())
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tournament is already running!");
                },
                () ->  new ResponseStatusException(HttpStatus.NOT_FOUND));
        try {
            return tournamentService.addPlayerToTournament(playerId, tournamentId);
        } catch (TournamentNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch (ResponseStatusException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public TournamentDto removePlayer(@PathVariable Long playerId, @PathVariable Long tournamentId) {
        try {
            return tournamentService.removePlayerFromTournament(playerId, tournamentId);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public TournamentDto startTournament(@PathVariable Long tournamentId) {
        gameService.createAllGames(tournamentId);
        return tournamentService.findById(tournamentId)
                .map(tournamentService::startTournament)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament has not been found!"));
    }

    @Override
    public void deleteTournament(@PathVariable Long tournamentId) {
        tournamentService.findById(tournamentId)
                .ifPresentOrElse(
                        (tournament) -> tournamentService.delete(tournament),
                        () -> {
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                        }
                );
    }

    /** Functions only for testing  ------------------------ **/
    @Override
    public void seedPlayers(@PathVariable Long tournamentId) {
        tournamentService.findById(tournamentId).ifPresentOrElse(
                (tournament) -> {
                    System.out.println("TEST");
                    tournamentService.snakeSeed(tournament);
                },
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament has not found!")
        );
    }

    @Override
    public void stopTournament(@PathVariable Long tournamentId) {
        tournamentService.findById(tournamentId)
                .ifPresentOrElse(
                        (tournament) -> {
                            tournament.setRunning(false);
                            tournamentService.save(tournament);
                        },
                        () -> {
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                        }
                );
    }
    /** ------------------------------------------------ **/

}