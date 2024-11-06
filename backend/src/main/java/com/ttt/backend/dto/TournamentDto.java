package com.ttt.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class TournamentDto {
    private Long id;

    private String name;

    private String category;

    private Long event_id;

    private boolean isRunning;

    private List<PlayerDto> playerDtoList;

}
