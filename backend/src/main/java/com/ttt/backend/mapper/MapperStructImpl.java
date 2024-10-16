package com.ttt.backend.mapper;

import com.ttt.backend.dto.*;
import com.ttt.backend.models.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

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
    public EventDto eventToEventDto(Event event) {
        return EventDto.builder()
                .id(event.getId())
                .name(event.getName())
                .date(event.getDate())
                .build();
    }

    @Override
    public Player createPlayer(PlayerDto playerDto) {
        return Player.builder()
                .firstname(playerDto.getFirstname())
                .lastname(playerDto.getLastname())
                .gender(playerDto.getGender())
                .birthday(playerDto.getDate())
                .playerCategoryList(new HashSet<>())
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

    @Override
    public Tournament tournamentDtoToTournament(TournamentDto tournamentDto, Event event, Category category) {
        return Tournament.builder()
                .name(tournamentDto.getName())
                .event(event)
                .category(category)
                .build();
    }

    @Override
    public TournamentDto tournamentToTournamentDto(Tournament tournament) {
        return TournamentDto.builder()
                .name(tournament.getName())
                .category(tournament.getCategory().getName())
                .build();
    }

}
