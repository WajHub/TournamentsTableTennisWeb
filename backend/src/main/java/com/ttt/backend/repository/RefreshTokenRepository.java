package com.ttt.backend.repository;

import com.ttt.backend.models.RefreshToken;
import com.ttt.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    Optional <RefreshToken> findByUser(User user);

    @Modifying
    int deleteByUser(User user);
}