package com.ttt.backend.repository;

import com.ttt.backend.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findAllById(Long id);
    Category findAllByName(String name);
}
