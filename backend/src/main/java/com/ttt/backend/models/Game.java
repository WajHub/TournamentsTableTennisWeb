package com.ttt.backend.models;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "game")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name = "tournament_id", nullable = false)
    private Long tournamentId;

    @ManyToOne
    @JoinColumn(name = "player_home_id", nullable = false)
    private Player playerHome;

    @ManyToOne
    @JoinColumn(name = "player_away_id", nullable = false)
    private Player playerAway;

    @ManyToOne
    @JoinColumn(name = "player_winner_id")
    private Player playerWinner;

    @Column(name = "sets_home")
    private int setsHome;

    @Column(name = "sets_away")
    private int setsAway;

    @ElementCollection(targetClass = Integer.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "points_home", joinColumns = @JoinColumn(name = "points_home_id"))
    @Column(name = "points_home")
    private List<Integer> pointsHome;

    @ElementCollection(targetClass = Integer.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "points_away", joinColumns = @JoinColumn(name = "points_away_id"))
    @Column(name = "points_away")
    private List<Integer> pointsAway;

    @Column(name = "is_finished")
    private boolean isFinished;

    @Column(name = "round")
    private int round;
}
