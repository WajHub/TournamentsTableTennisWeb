package com.ttt.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000/")
public class TestController {

    @GetMapping("/api/admin/test")
    String getHome(){
        return "Hello from backend";
    }
    @GetMapping("/user")
    String getHome2(){
        return "Hello for User";
    }
}
