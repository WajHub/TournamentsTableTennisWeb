package com.ttt.backend.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "game")
@ToString
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

    @ManyToOne
    @JoinColumn(name = "tournament-id")
    @JsonBackReference
    @ToString.Exclude
    private Tournament tournament;

    @ManyToOne
    @JoinColumn(name = "player_home_id")
    private Player playerHome;

    @ManyToOne
    @JoinColumn(name = "player_away_id")
    private Player playerAway;

    @ManyToOne
    @JoinColumn(name = "player_winner_id")
    private Player playerWinner;

    @Column(name = "next_match_id")
    private Long nextMatchId;

    @Column(name = "sets_home")
    private int setsHome;

    @Column(name = "sets_away")
    private int setsAway;

    @ElementCollection(targetClass = Integer.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "points_home", joinColumns = @JoinColumn(name = "points_home_id"))
    @Column(name = "points_home")
    @ToString.Exclude
    private List<Integer> pointsHome;

    @ElementCollection(targetClass = Integer.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "points_away", joinColumns = @JoinColumn(name = "points_away_id"))
    @Column(name = "points_away")
    @ToString.Exclude
    private List<Integer> pointsAway;

    @Column(name = "round")
    private int round;

    /** CREATED, SCHEDULED, RUNNING, DONE, WALK_OVER **/
    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private GameState state;
}
