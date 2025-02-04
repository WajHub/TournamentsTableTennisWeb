package com.ttt.backend.repository;

import com.ttt.backend.entity.auth.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {

    Optional<ConfirmationToken> findAllByToken(String token);
    Optional<ConfirmationToken> findAllByUser_Email(String email);

    void deleteByToken(String token);
    void deleteAllByUser_Email(String email);
}
