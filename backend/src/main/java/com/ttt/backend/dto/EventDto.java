package com.ttt.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class EventDto {
    private String name;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;

}
