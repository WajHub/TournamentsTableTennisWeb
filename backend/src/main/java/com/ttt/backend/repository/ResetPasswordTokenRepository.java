package com.ttt.backend.repository;

import com.ttt.backend.model.entity.auth.ResetPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, Long> {
    Optional<ResetPasswordToken> findByToken (String token);

    Optional<ResetPasswordToken> deleteByToken (String token);
}
