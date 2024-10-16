package com.ttt.backend.services;

import com.ttt.backend.dto.TournamentDto;
import com.ttt.backend.mapper.MapperStructImpl;
import com.ttt.backend.models.Tournament;
import com.ttt.backend.repository.CategoryRepository;
import com.ttt.backend.repository.EventRepository;
import com.ttt.backend.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService {
    private TournamentRepository tournamentRepository;
    private EventRepository eventRepository;
    private CategoryRepository categoryRepository;
    private MapperStructImpl mapperStruct;

    @Autowired
    public TournamentService(TournamentRepository tournamentRepository, EventRepository eventRepository, CategoryRepository categoryRepository, MapperStructImpl mapperStruct) {
        this.tournamentRepository = tournamentRepository;
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
        this.mapperStruct = mapperStruct;
    }

    public Tournament save (Tournament tournament){
        return tournamentRepository.save(tournament);
    }
    public Tournament save (TournamentDto tournamentDto){
        return tournamentRepository.save(
            mapperStruct.tournamentDtoToTournament(
                tournamentDto,
                eventRepository.findAllById(tournamentDto.getEvent_id()),
                categoryRepository.findAllByName(tournamentDto.getCategory())
            )
        );
    }

    public List<TournamentDto> findAllByIdEvent(Long id){
        return tournamentRepository
                .findAllByEvent(eventRepository.findAllById(id))
                    .stream().map((tournament -> (
                        mapperStruct.tournamentToTournamentDto(tournament))
                    ))
                    .toList();
    }
}
