package com.ttt.backend.dto.request;


import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
public class GameResultRequest {
    private Long homeId;
    private Long awayId;
    private List<Integer> pointsHome;
    private List<Integer> pointsAway;

    public Long idWinner(){
        return (this.setsHome() > this.setsAway()) ? this.getHomeId() : this.getAwayId();
    }

    public Long idLoser(){
        return (this.setsHome() < this.setsAway()) ? this.getHomeId() : this.getAwayId();
    }

    public int setsHome(){
        int sets = 0;
        for(int i=0; i< this.getPointsHome().size(); i++){
            if(this.getPointsHome().get(i)>this.getPointsAway().get(i)){
                sets++;
            }
        }
        return sets;
    }

    public int setsAway(){
        int sets = 0;
        for(int i=0; i< this.getPointsHome().size(); i++){
            if(this.getPointsHome().get(i)<this.getPointsAway().get(i)){
                sets++;
            }
        }
        return sets;
    }
}
