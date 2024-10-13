package com.ttt.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class PlayerCategoryDto {
    private Long id;
    private CategoryDto categoryDto;
    private int points;
}
