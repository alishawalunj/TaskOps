package com.nzefler.auth.controller;

import com.nzefler.auth.service.AuthService;
import org.springframework.stereotype.Controller;

@Controller
public class AuthGraphQLController {

    private final AuthService authService;

    public AuthGraphQLController(AuthService authService) {
        this.authService = authService;
    }

}
