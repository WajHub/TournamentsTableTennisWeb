package com.ttt.backend.controllers.category;

import com.ttt.backend.dto.CategoryDto;
import com.ttt.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class CategoryControllerImpl implements CategoryController {

    private final CategoryService categoryService;
    @Autowired
    public CategoryControllerImpl(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public List<CategoryDto> findAll() {
        return categoryService.findAllDtos();
    }
}