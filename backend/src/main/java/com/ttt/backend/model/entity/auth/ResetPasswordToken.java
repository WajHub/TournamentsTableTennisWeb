package com.ttt.backend.model.entity.auth;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity(name = "reset_password_token")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordToken extends Token{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

}
