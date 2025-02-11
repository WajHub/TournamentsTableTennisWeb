package com.ttt.backend.model.entity;

import com.ttt.backend.model.enums.TournamentType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;


import java.util.ArrayList;
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

    @OneToMany(mappedBy = "tournament", orphanRemoval = true)
    private List<Game> games = new ArrayList<>();

}
