package com.ttt.backend.services;

import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Category;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.Tournament;
import com.ttt.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private PlayerRepository playerRepository;
    private PlayerCategoryService playerCategoryService;
    private MapperStructImpl mapperStruct;

    @Autowired
    public PlayerService(PlayerRepository playerRepository, PlayerCategoryService playerCategoryService, MapperStructImpl mapperStruct) {
        this.playerRepository = playerRepository;
        this.playerCategoryService = playerCategoryService;
        this.mapperStruct = mapperStruct;
    }

    public Player save(Player player){
        return playerRepository.save(player);
    }

    public List<PlayerDto> findAll() {
       return playerRepository.findAll()
                .stream()
                .map(player ->  mapperStruct.playerToPlayerDto(player, playerCategoryService.findPlayerCategoriesDto(player)))
                .toList();
    }

    public  List<Category> findAllCategories (Player player) {
        return playerCategoryService.findByPlayer(player);
    }


    public boolean existById(Long id){
        return playerRepository.existsById(id);
    }

    public void deleteById(Long id){
        playerRepository.deleteById(id);
    }
}
