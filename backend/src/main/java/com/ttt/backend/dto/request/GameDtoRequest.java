package com.ttt.backend.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class GameDtoRequest {
    private Long idTournament;
    private int round;

}
