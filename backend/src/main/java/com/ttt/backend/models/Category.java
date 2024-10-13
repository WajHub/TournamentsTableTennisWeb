package com.ttt.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name= "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    @ColumnDefault("'SINGLE'")
    @Enumerated(EnumType.STRING)
    private CategoryType type;

    @Column(name = "ageLimit", nullable = false)
    private int ageLimit;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<PlayerCategory> playerCategoryList;

}
