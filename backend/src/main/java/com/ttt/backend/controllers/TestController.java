package com.ttt.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000/")
public class TestController {

    @GetMapping("/test")
    String getHome(){
        return "Hello from backend";
    }
}
