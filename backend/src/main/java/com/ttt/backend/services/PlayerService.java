package com.ttt.backend.services;

import com.ttt.backend.models.Player;
import com.ttt.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    private PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player save(Player player){
        return playerRepository.save(player);
    }

    public List<Player> findAll() {
        return playerRepository.findAll();
    }

    public Optional<Player> findById(Long id){
        return playerRepository.findById(id);
    }

    public boolean existById(Long id){
        return playerRepository.existsById(id);
    }

    public void deleteById(Long id){
        playerRepository.deleteById(id);
    }
}
