package com.ttt.backend.services;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.exception.TournamentNotFoundException;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.Tournament;
import com.ttt.backend.repository.CategoryRepository;
import com.ttt.backend.repository.EventRepository;
import com.ttt.backend.repository.PlayerRepository;
import com.ttt.backend.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TournamentService {
    private TournamentRepository tournamentRepository;
    private EventRepository eventRepository;
    private CategoryRepository categoryRepository;
    private PlayerCategoryService playerCategoryService;
    private PlayerRepository playerRepository;
    private PlayerService playerService;
    private MapperStructImpl mapperStruct;

    @Autowired
    public TournamentService(TournamentRepository tournamentRepository, EventRepository eventRepository, CategoryRepository categoryRepository, PlayerCategoryService playerCategoryService, PlayerRepository playerRepository, PlayerService playerService, MapperStructImpl mapperStruct) {
        this.tournamentRepository = tournamentRepository;
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
        this.playerCategoryService = playerCategoryService;
        this.playerRepository = playerRepository;
        this.playerService = playerService;
        this.mapperStruct = mapperStruct;
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
}
