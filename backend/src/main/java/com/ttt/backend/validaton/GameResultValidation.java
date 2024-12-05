package com.ttt.backend.validaton;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = GameResultValidator.class)
@Target( {ElementType.PARAMETER, ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface GameResultValidation {
    String message() default "Invalid Result of game!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
