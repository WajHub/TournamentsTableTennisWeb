package com.ttt.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "player_category")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "player_id")
    Player player;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    Category category;

    @Column(name = "points")
    @ColumnDefault("100")
    private int points;

}
