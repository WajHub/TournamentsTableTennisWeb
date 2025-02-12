package com.ttt.backend.model.entity.auth;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;


@Entity(name = "confirmationToken")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmationToken extends Token{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

}
