package com.ttt.backend.services;

import com.ttt.backend.dto.CategoryDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Category;
import com.ttt.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;
    private MapperStructImpl mapperStruct;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, MapperStructImpl mapperStruct) {
        this.categoryRepository = categoryRepository;
        this.mapperStruct = mapperStruct;
    }

    public List<Category> findAll(){
        return categoryRepository.findAll();
    }

    public List<CategoryDto> findAllDtos(){
        return categoryRepository.findAll()
                .stream()
                .map((category -> mapperStruct.categoryToCategoryDto(category)))
                .toList();
    }


}
