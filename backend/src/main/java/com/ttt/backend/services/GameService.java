package com.ttt.backend.services;

import com.ttt.backend.dto.request.GameDtoCreate;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Game;
import com.ttt.backend.models.Tournament;
import com.ttt.backend.repository.GameRepository;
import com.ttt.backend.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class GameService {
    private GameRepository gameRepository;
    private TournamentRepository tournamentRepository;
    private MapperStructImpl mapperStruct;

    @Autowired
    public GameService(GameRepository gameRepository, TournamentRepository tournamentRepository, MapperStructImpl mapperStruct) {
        this.gameRepository = gameRepository;
        this.tournamentRepository = tournamentRepository;
        this.mapperStruct = mapperStruct;
    }

    public Optional<Game> findById(Long id){
        return gameRepository.findById(id);
    }

    public void deleteById(Long id){
        gameRepository.deleteById(id);
    }

    public void save(GameDtoCreate gameDtoCreate){
        tournamentRepository.findById(gameDtoCreate.getIdTournament()).ifPresentOrElse(
                (value) -> {
                    if(value.isRunning()) gameRepository.save(mapperStruct.createNewGame(gameDtoCreate, value, null));
                    else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tournament has not started!");
                },
                () ->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament doesn't exist");
                }
            );
    }

    public void createAllGames(Long tournamentId) {
        tournamentRepository.findById(tournamentId).ifPresentOrElse(
                (tournament) -> {
                    if(tournament.isRunning()) {
                        int numberOfRounds = calculateRounds(tournament.getPlayerList().size());
                        createTree(0, tournament, numberOfRounds, null);

                    }
                    else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tournament has not started!");
                },
                () ->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament doesn't exist");
                }
        );
    }

    private Game createTree(int depth, Tournament tournament, int numberOfRounds, Long nextMatchId){
        depth++;
        Game game = gameRepository.save(
                mapperStruct.createNewGame(
                    GameDtoCreate.builder()
                        .round(depth)
                        .idTournament(tournament.getId())
                    .build(),
                    tournament,
                    nextMatchId)
                );
        if(depth<numberOfRounds){
            createTree(depth, tournament, numberOfRounds, game.getId());
            createTree(depth, tournament, numberOfRounds, game.getId());
        }
        return game;
    }

    public static int calculateRounds(int players) {
        if (players < 2) {
            throw new IllegalArgumentException("Liczba zawodników musi być większa lub równa 2");
        }
        return (int) Math.ceil(Math.log(players) / Math.log(2));
    }
}
