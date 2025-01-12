package com.ttt.backend.service;

import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.dto.request.GameDtoRequest;
import com.ttt.backend.dto.request.GameResultRequest;
import com.ttt.backend.dto.response.GameDtoResponse;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.entity.Game;
import com.ttt.backend.entity.GameState;
import com.ttt.backend.entity.Player;
import com.ttt.backend.entity.Tournament;
import com.ttt.backend.repository.GameRepository;
import com.ttt.backend.repository.PlayerRepository;
import com.ttt.backend.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Service
public class GameService {
    private final MapperStructImpl mapperStructImpl;
    private GameRepository gameRepository;
    private TournamentRepository tournamentRepository;
    private PlayerRepository playerRepository;
    private MapperStructImpl mapperStruct;

    @Autowired
    public GameService(GameRepository gameRepository, TournamentRepository tournamentRepository, PlayerRepository playerRepository , MapperStructImpl mapperStruct, MapperStructImpl mapperStructImpl) {
        this.gameRepository = gameRepository;
        this.tournamentRepository = tournamentRepository;
        this.playerRepository = playerRepository;
        this.mapperStruct = mapperStruct;
        this.mapperStructImpl = mapperStructImpl;
    }

    public GameDtoResponse save(GameDtoRequest gameDtoRequest){
        return tournamentRepository.findById(gameDtoRequest.getIdTournament()).map(
                (tournament) -> {
                    if(tournament.isRunning()) {
                        Game game =  gameRepository.save(mapperStruct.createNewGame(gameDtoRequest, tournament, null));
                        return mapperStruct.gameToGameDtoResponse(game);
                    }
                    else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tournament has not started!");
                }
        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament doesn't exist!"));
    }

    public GameDtoResponse setState(Long gameId, GameState state) {
        return gameRepository.findById(gameId)
                .map((game -> {
                    game.setState(state);
                    gameRepository.save(game);
                    return mapperStructImpl.gameToGameDtoResponse(game);
                }))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Game doesn't exist!"));
    }

    public TournamentDto setResult(Game game, GameResultRequest gameResultRequest) {
        Player winnerPlayer = playerRepository.findById(gameResultRequest.idWinner()).get();
        Player looserPlayer = playerRepository.findById(gameResultRequest.idLoser()).get();
        game.setState(GameState.DONE);

        game.setPointsHome(gameResultRequest.getPointsHome());
        game.setPointsAway(gameResultRequest.getPointsAway());

        game.setSetsHome(gameResultRequest.setsHome());
        game.setSetsAway(gameResultRequest.setsAway());

        game.setPlayerWinner(winnerPlayer);
        if(game.getNextMatchId()!=null){
            handleNextGame(game.getNextMatchId(), winnerPlayer);
        }

        winnerPlayer.getPlayerCategoryList()
                .stream()
                .filter(playerCategory -> playerCategory.getCategory().getId()
                                                        .equals(game.getTournament().getCategory().getId())
                        )
                .forEach(playerCategory -> playerCategory
                        .setPoints(playerCategory.getPoints()+(5/game.getRound()*2))
        );

        looserPlayer.getPlayerCategoryList()
                .stream()
                .filter(playerCategory -> playerCategory.getCategory().getId()
                        .equals(game.getTournament().getCategory().getId())
                )
                .forEach(playerCategory -> playerCategory
                        .setPoints(playerCategory.getPoints()-(game.getRound()/10*2))
                );

        gameRepository.save(game);
        return mapperStructImpl.tournamentToTournamentDto(game.getTournament());
    }

    public Game findById(Long id){
        return gameRepository.findById(id).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Game doesn't exist!")
        );
    }

    public void deleteById(Long id){
        gameRepository.deleteById(id);
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

    public List<GameDtoResponse> createAllGames(Long tournamentId) {
        tournamentRepository.findById(tournamentId).ifPresentOrElse(
                (tournament) -> {
                    int numberOfRounds = calculateRounds(tournament.getPlayerList().size());
                    createTree(0, tournament, numberOfRounds, null);
                },
                () ->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tournament doesn't exist");
                }
        );
        return null;
    }

    public static int calculateRounds(int players) {
        if (players < 2) {
            throw new IllegalArgumentException("Liczba zawodników musi być większa lub równa 2");
        }
        return (int) Math.ceil(Math.log(players) / Math.log(2));
    }

    /** Recursive algorithm to create all games in bracket **/
    private Game createTree(int depth, Tournament tournament, int numberOfRounds, Long nextMatchId){
        depth++;
        Game game = gameRepository.save(
                mapperStruct.createNewGame(
                    GameDtoRequest.builder()
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

    private void handleNextGame(Long gameId, Player winner) {
        gameRepository.findById(gameId)
            .ifPresentOrElse((game)->
                {
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
