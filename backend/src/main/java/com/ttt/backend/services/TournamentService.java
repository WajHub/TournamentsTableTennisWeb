package com.ttt.backend.services;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.exception.TournamentNotFoundException;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Game;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.Tournament;
import com.ttt.backend.repository.*;
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
public class TournamentService {
    private final GameRepository gameRepository;
    private TournamentRepository tournamentRepository;
    private EventRepository eventRepository;
    private CategoryRepository categoryRepository;
    private PlayerCategoryService playerCategoryService;
    private PlayerRepository playerRepository;
    private PlayerService playerService;
    private MapperStructImpl mapperStruct;

    @Autowired
    public TournamentService(TournamentRepository tournamentRepository, EventRepository eventRepository, CategoryRepository categoryRepository, PlayerCategoryService playerCategoryService, PlayerRepository playerRepository, PlayerService playerService, MapperStructImpl mapperStruct, GameRepository gameRepository) {
        this.tournamentRepository = tournamentRepository;
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
        this.playerCategoryService = playerCategoryService;
        this.playerRepository = playerRepository;
        this.playerService = playerService;
        this.mapperStruct = mapperStruct;
        this.gameRepository = gameRepository;
    }

    public Tournament save (Tournament tournament){
        return tournamentRepository.save(tournament);
    }

    public Tournament save (TournamentDto tournamentDto){
        return tournamentRepository.save(
            mapperStruct.tournamentDtoToTournament(
                tournamentDto,
                eventRepository.findAllById(tournamentDto.getEvent_id()),
                categoryRepository.findAllByName(tournamentDto.getCategory())
            )
        );
    }

    public void delete(Tournament tournament){
        tournamentRepository.delete(tournament);
    }

    public Optional<Tournament> findById(Long id){
        return tournamentRepository.findById(id);
    }

    public List<TournamentDto> findAllByIdEvent(Long id){
        return tournamentRepository
                .findAllByEvent(eventRepository.findAllById(id))
                    .stream().map((tournament -> (
                        mapperStruct.tournamentToTournamentDto(tournament))
                    ))
                    .toList();
    }

    /** Return all players who can be added to the tournament
     (Player is not already in tournament and player has properly category) **/
    public List<PlayerDto> findPlayersForTournament(Long tournamentId){
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new TournamentNotFoundException(tournamentId));
        return playerRepository.findAll().stream()
                .filter((player) -> playerService.findAllCategories(player).contains(tournament.getCategory())&&
                                    !tournament.getPlayerList().contains(player))
                .map((player) -> mapperStruct.playerToPlayerDto(player ,playerCategoryService.findPlayerCategoriesDto(player)))
                .toList();
    }

    public void addPlayerToTournament(Long playerId, Long tournamentId){
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new TournamentNotFoundException(tournamentId));

        Player player = playerRepository.findById(playerId)
                .orElseThrow( () -> new RuntimeException("Player not found!"));

        if(!tournament.getPlayerList()
                .contains(player))
        {
            tournament.getPlayerList().add(player);
            player.getTournamentList().add(tournament);

            playerRepository.save(player);
            tournamentRepository.save(tournament);
        }
        else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Player already in tournament");
        }
    }

    public void removePlayerFromTournament(Long playerId, Long tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new TournamentNotFoundException(tournamentId));

        Player player = playerRepository.findById(playerId)
                .orElseThrow( () -> new RuntimeException("Player not found!"));

        if(tournament.getPlayerList()
                .contains(player))
        {
            tournament.getPlayerList().remove(player);
            player.getTournamentList().remove(tournament);

            playerRepository.save(player);
            tournamentRepository.save(tournament);
        }
    }

    public void removePlayerFromAllTournaments(Long playerId){
        tournamentRepository.findAll()
                .stream()
                .filter((tournament -> tournament.getPlayerList().contains(playerId)))
                .forEach(tournament -> {
                    List<Player> playerList= tournament.getPlayerList();
                    playerList.forEach((player)->{
                        if(player.getId()==playerId){
                            playerList.remove(player);
                        }
                    });
                });
    }

    public void startTournament(Long tournamentId){
        tournamentRepository.findById(tournamentId)
                .ifPresentOrElse(
                        (tournament -> {
                            tournament.setRunning(true);
                            snakeSeed(tournament);
                            tournamentRepository.save(tournament);
                        }),
                        () -> {
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                        }
                );
    }

    // TODO: refactor
    /** Algorithm to seed players; matches have indexes of players in List **/
    public void snakeSeed(Tournament tournament) {
        int numberOfRounds = GameService.calculateRounds(tournament.getPlayerList().size());
        int participantCount = tournament.getPlayerList().size();

        List<Game> games = tournament.getGames().stream()
                .filter(game -> game.getRound() == numberOfRounds)
                .toList();

        List<Game> nextGames = tournament.getGames().stream()
                .filter(game -> game.getRound() == numberOfRounds - 1)
                .toList();

        // TODO: Sort players by points in category
        List<Player> players = tournament.getPlayerList();

        List<List<Integer>> matches = List.of(List.of(1, 2));
        for (int round = 1; round < numberOfRounds; round++) {
            int sum = (int) (Math.pow(2, round + 1) + 1);
            matches = matches.stream()
                    .flatMap(match -> Stream.of(
                            List.of(changeIntoBye(match.get(0), participantCount),
                                    changeIntoBye(sum - match.get(0), participantCount)),
                            List.of(changeIntoBye(sum - match.get(1), participantCount),
                                    changeIntoBye(match.get(1), participantCount))
                    ))
                    .toList();
        }

        for (int i = 0; i < matches.size(); i++) {
            Game game = games.get(i);
            Player home = getPlayerByIndex(matches.get(i).get(0), players);
            Player away = getPlayerByIndex(matches.get(i).get(1), players);
            game.setState("SCHEDULED");
            
            if(home == null || away == null){
                game.setState("WALK_OVER");
                Player winner = home != null ? home : away;
                Long nextGameId = game.getNextMatchId();
                Game nextGame = nextGames.stream()
                        .filter(g -> Objects.equals(g.getId(), nextGameId))
                        .findFirst().get();
                nextGame.setState("CREATED");
                if (nextGame.getPlayerAway() == null) {
                    nextGame.setPlayerAway(winner);
                } else {
                    nextGame.setPlayerHome(winner);
                }
                gameRepository.save(nextGame);
            }

            game.setPlayerHome(home);
            game.setPlayerAway(away);

            game.setNextMatchId(nextGames.get(i / 2).getId());
            gameRepository.save(game);
        }
    }

    private Player getPlayerByIndex(int index, List<Player> players) {
        return index >= 0 ? players.get(index - 1) : null;
    }

    private int changeIntoBye(int seed, int participantsCount) {
        return seed <= participantsCount ? seed : -1;
    }

}
