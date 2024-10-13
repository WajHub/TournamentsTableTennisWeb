package com.ttt.backend.mapper;

import com.ttt.backend.dto.CategoryDto;
import com.ttt.backend.dto.PlayerCategoryDto;
import com.ttt.backend.dto.PlayerDto;
import com.ttt.backend.models.Category;
import com.ttt.backend.models.Event;
import com.ttt.backend.dto.EventDto;
import com.ttt.backend.models.Player;
import com.ttt.backend.models.PlayerCategory;

public interface MapperStruct {
    Event createEvent(EventDto eventDto);

    Player createPlayer(PlayerDto playerDto);

    CategoryDto categoryToCategoryDto(Category category);

    PlayerCategoryDto playerCategoryToPlayerCategoryDto(PlayerCategory playerCategory);

    PlayerDto playerToPlayerDto(Player player);
}
