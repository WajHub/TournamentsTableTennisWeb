package com.ttt.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class TournamentDto {
    private String name;

    private String category;

    private Long event_id;

}
