package com.ttt.backend.mapper;

import com.ttt.backend.dto.CategoryDto;
import com.ttt.backend.dto.EventDto;
import com.ttt.backend.dto.PlayerCategoryDto;
import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.models.Category;
import com.ttt.backend.models.Event;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.PlayerCategory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class MapperStructImpl implements MapperStruct{
    @Override
    public Event createEvent(EventDto eventDto) {
        return Event.builder()
                .name(eventDto.getName())
                .date(eventDto.getDate())
                .tournaments(new ArrayList<>())
                .build();
    }

    @Override
    public Player createPlayer(PlayerDto playerDto) {
        return Player.builder()
                .firstname(playerDto.getFirstname())
                .lastname(playerDto.getLastname())
                .gender(playerDto.getGender())
                .birthday(playerDto.getDate())
                .playerCategoryList(new ArrayList<>())
                .build();
    }

    @Override
    public CategoryDto categoryToCategoryDto(Category category) {
        return CategoryDto.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .categoryType(category.getType().name())
                    .ageLimit(category.getAgeLimit())
                    .gender(category.getGender().name())
                .build();
    }

    @Override
    public PlayerCategoryDto playerCategoryToPlayerCategoryDto(PlayerCategory playerCategory) {
        CategoryDto categoryDto =
                this.categoryToCategoryDto(playerCategory.getCategory());

        return PlayerCategoryDto.builder()
                .id(playerCategory.getId())
                .points(playerCategory.getPoints())
                .categoryDto(categoryDto)
                .build();
    }

    @Override
    public PlayerDto playerToPlayerDto(Player player) {
       return PlayerDto.builder()
                   .id(player.getId())
                   .firstname(player.getFirstname())
                   .lastname(player.getLastname())
                   .gender(player.getGender())
                   .date(player.getBirthday())
               .build();
    }

}
