package com.ttt.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "players")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Player {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name="lastname")
    private String lastname;

    @Column(name ="gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "birthday")
    private LocalDate birthday;

    @OneToMany(mappedBy = "player",orphanRemoval = true)
    @JsonBackReference
    @ToString.Exclude
    Set<PlayerCategory> playerCategoryList;

    @ManyToMany(mappedBy = "playerList", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Tournament> tournamentList;

    public int getAge(){
        long years = java.time.temporal.ChronoUnit.YEARS.between(birthday,  LocalDate.now() );
        return (int) years;
    }

    public int getPointsInTournament(Tournament tournament) {
        return this.getPlayerCategoryList()
                .stream()
                .filter(playerCategory ->
                            playerCategory.getCategory().getId()
                                    .equals(tournament.getCategory().getId())
                ).findFirst()
                .get()
                .getPoints();
    }

}
