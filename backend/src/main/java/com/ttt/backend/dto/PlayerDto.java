package com.ttt.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ttt.backend.entity.enums.Gender;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
public class PlayerDto {
    private Long id;
    private String firstname;

    private String lastname;

    private Gender gender;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;

    private List<PlayerCategoryDto> playerCategoryDtoList;
}
