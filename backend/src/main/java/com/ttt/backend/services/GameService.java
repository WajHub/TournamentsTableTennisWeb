package com.ttt.backend.services;

import com.ttt.backend.dto.request.GameDtoCreate;
import com.ttt.backend.dto.request.GameResultRequest;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Game;
import com.ttt.backend.models.GameState;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.Tournament;
import com.ttt.backend.repository.GameRepository;
import com.ttt.backend.repository.PlayerRepository;
import com.ttt.backend.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class GameService {
    private GameRepository gameRepository;
    private TournamentRepository tournamentRepository;
    private PlayerRepository playerRepository;
    private MapperStructImpl mapperStruct;

    @Autowired
    public GameService(GameRepository gameRepository, TournamentRepository tournamentRepository,PlayerRepository playerRepository , MapperStructImpl mapperStruct) {
        this.gameRepository = gameRepository;
        this.tournamentRepository = tournamentRepository;
        this.playerRepository = playerRepository;
        this.mapperStruct = mapperStruct;
    }

    public Optional<Game> findById(Long id){
        return gameRepository.findById(id);
    }

    public List<GameDtoResponse> findByTournamentId(Long tournamentId, String status) {
        if(status == null) {
            return tournamentRepository.findById(tournamentId)
                    .map(tournament ->
                            gameRepository.findAllByTournament(tournament)
                                    .stream()
                                    .map(game -> mapperStruct.gameToGameDtoResponse(game))
                                    .toList()
                    )
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament not found!"));
        }
        else{
            return tournamentRepository.findById(tournamentId)
                    .map(tournament ->
                            gameRepository.findAllByTournament(tournament)
                                    .stream()
                                    .map(game -> mapperStruct.gameToGameDtoResponse(game))
                                    .filter((game) -> Objects.equals(game.getState(), status))
                                    .toList()
                    )
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament not found!"));
        }
    }


    public void deleteById(Long id){
        gameRepository.deleteById(id);
    }

    public void save(GameDtoCreate gameDtoCreate){
        tournamentRepository.findById(gameDtoCreate.getIdTournament()).ifPresentOrElse(
                (tournament) -> {
                    if(tournament.isRunning()) gameRepository.save(mapperStruct.createNewGame(gameDtoCreate, tournament, null));
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
                    int numberOfRounds = calculateRounds(tournament.getPlayerList().size());
                    createTree(0, tournament, numberOfRounds, null);
                },
                () ->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament doesn't exist");
                }
        );
    }

    /** Recursive algorithm to create all games in bracket **/
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

    public Game setState(Long gameId, GameState state) {
        return gameRepository.findById(gameId)
            .map((game -> {
                game.setState(state);
                gameRepository.save(game);
                return game;
            }))
                .orElseThrow();
    }

    public void setResult(Game game, GameResultRequest gameResultRequest) {
        Player winnerPlayer = playerRepository.findById(gameResultRequest.idWinner()).get();
        game.setState(GameState.DONE);

        game.setPointsHome(gameResultRequest.getPointsHome());
        game.setPointsAway(gameResultRequest.getPointsAway());

        game.setSetsHome(gameResultRequest.setsHome());
        game.setSetsAway(gameResultRequest.setsAway());

        game.setPlayerWinner(winnerPlayer);
        handleNextGame(game.getNextMatchId(), winnerPlayer);
        gameRepository.save(game);
    }

    private void handleNextGame(Long gameId, Player winner) {
        gameRepository.findById(gameId)
            .ifPresentOrElse((game)->
                {
                    System.out.println(game);
                    if(game.getPlayerHome()==null){
                        game.setPlayerHome(winner);
                    }
                    else if(game.getPlayerAway()==null){
                        game.setPlayerAway(winner);

                    }
                    if(game.getPlayerAway()!=null && game.getPlayerHome()!= null) game.setState(GameState.SCHEDULED);
                    gameRepository.save(game);
                },
            ()-> {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            });
    }
}
