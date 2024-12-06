package com.ttt.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import lombok.Value;

@Value
@Builder
public class PlayerDtoResponseInGame {
    Long id;
    @Builder.Default
    String resultText = "";
    @Builder.Default
    @JsonProperty("isWinner")
    boolean winner = false;
    @Builder.Default
    String status = "";
    String name;
}
