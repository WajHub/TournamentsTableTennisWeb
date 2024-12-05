package com.ttt.backend.validaton;

import com.ttt.backend.dto.request.GameResultRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class GameResultValidator implements ConstraintValidator<GameResultValidation, GameResultRequest> {

    @Override
    public void initialize(GameResultValidation constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(GameResultRequest gameResultRequest, ConstraintValidatorContext constraintValidatorContext) {
        if(gameResultRequest.getPointsHome() == null ||
                gameResultRequest.getPointsAway() == null||
                gameResultRequest.getAwayId() == null ||
                gameResultRequest.getHomeId() == null) return false;
        else if (gameResultRequest.getPointsHome().size() != gameResultRequest.getPointsAway().size()){
            return false;
        }
        else{
            int setsHome = 0;
            int setsAway = 0;
            for(int i = 0; i< gameResultRequest.getPointsHome().size() ;i++){
                int pointsHome = gameResultRequest.getPointsHome().get(i);
                int pointsAway = gameResultRequest.getPointsAway().get(i);
                if(pointsHome < 11 && pointsAway < 11)
                    return false;
                else if(Math.abs(pointsHome-pointsAway) < 2)
                    return false;
                if (pointsHome > pointsAway) {
                    setsHome++;
                } else {
                    setsAway++;
                }
            }
            return setsHome >= 3 || setsAway >= 3;
        }

    }
}
