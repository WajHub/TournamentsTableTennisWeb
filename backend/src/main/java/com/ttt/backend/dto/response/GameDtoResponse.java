package com.ttt.backend.dto.response;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class GameDtoResponse {
    Long id;
    String name;
    Long idNextMatch;
    String tournamentRoundText;
    String startTime;
    String state;
    List<PlayerDtoResponseInGame> participants;

}
