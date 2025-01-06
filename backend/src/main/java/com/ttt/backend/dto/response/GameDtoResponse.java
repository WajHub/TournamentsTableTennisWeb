package com.ttt.backend.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

import java.util.List;

@Data
@Builder

public class GameDtoResponse {
    Long id;
    Long tournamentId;
    String name;
    Long nextMatchId;
    String tournamentRoundText;
    String startTime;
    String state;
    List<PlayerDtoResponseInGame> participants;

}
