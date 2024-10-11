package com.ttt.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ttt.backend.models.Gender;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Builder
public class PlayerDto {
    private String firstname;

    private String lastname;

    private Gender gender;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;
}
