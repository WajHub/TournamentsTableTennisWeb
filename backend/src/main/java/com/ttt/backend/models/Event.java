package com.ttt.backend.models;

import com.ttt.backend.dto.EventDto;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.HashCodeExclude;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Table(name = "events")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
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
    @ToString.Exclude
    @HashCodeExclude
    private List<Tournament> tournaments;

}
