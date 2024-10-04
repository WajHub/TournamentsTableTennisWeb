package com.ttt.backend.models;


import com.ttt.backend.dto.EventDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "events")
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "date")
    private LocalDate date;

    @OneToMany(mappedBy = "event")
    private List<Tournament> tournaments;

    public Event (EventDto eventDto){
        setName(eventDto.getName());
        setDate(null);
        setTournaments(new ArrayList<>());
    }

}
