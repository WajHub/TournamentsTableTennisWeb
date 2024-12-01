package com.ttt.backend.dto.response;

import lombok.Builder;
import lombok.ToString;
import lombok.Value;

@Value
@Builder
@ToString
public class PlayerDtoResponseInGame {
    Long id;
    String resultText = "";
    boolean isWinner = false;
    String status = "";
    String name;
}
