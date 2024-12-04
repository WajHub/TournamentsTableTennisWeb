package com.ttt.backend.controllers.category;

import com.ttt.backend.dto.CategoryDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
import java.util.List;

@RequestMapping("api")
public interface CategoryController {

    @GetMapping("/categories")
    @ResponseStatus(HttpStatus.OK)
    List<CategoryDto> findAll();
}