package com.ttt.backend.exception;

public class TournamentNotFoundException extends RuntimeException{
    public TournamentNotFoundException(Long id ) {super("Tournament not found with id: !"+id);}
}
