package com.ttt.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class CategoryDto {
    private Long id;
    private String name;
    private String categoryType;
    private int ageLimit;
    private String gender;
}
