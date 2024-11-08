package com.ttt.backend.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;


import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tournaments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "isRunning")
    @ColumnDefault("false")
    private boolean isRunning;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'SINGLE_ELIMINATION'")
    private TournamentType tournamentType;

    @JoinColumn(name = "numberOfRounds")
    @ColumnDefault("0")
    private int numberOfRounds;

    @ManyToMany
    @JoinTable(
            name="tournament_player",
            joinColumns = @JoinColumn(name = "tournament_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id")
    )
    private List<Player> playerList;

}
