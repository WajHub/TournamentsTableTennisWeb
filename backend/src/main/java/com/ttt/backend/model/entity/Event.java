package com.ttt.backend.model.entity;

import com.ttt.backend.model.entity.auth.User;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.HashCodeExclude;

import java.time.LocalDate;
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

    @OneToMany(mappedBy = "event", orphanRemoval = true)
    @ToString.Exclude
    @HashCodeExclude
    private List<Tournament> tournaments;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name= "event_user",
            joinColumns = @JoinColumn(name= "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

}
