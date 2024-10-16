package com.ttt.backend.repository;

import com.ttt.backend.models.Category;
import com.ttt.backend.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findAllById(Long id);
    Category findAllByName(String name);
}
