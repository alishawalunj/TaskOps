package com.nzefler.auth.controller;

import com.nzefler.auth.dto.JwtAuthResponseDTO;
import com.nzefler.auth.dto.OAuthLoginDTO;
import com.nzefler.auth.service.AuthService;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/oauth2/callback")
public class OAuthCallbackController {

    private final AuthService authService;

    public OAuthCallbackController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/google")
    public void google(@RequestParam String code, HttpServletResponse response) throws Exception {
        OAuthLoginDTO loginData = authService.exchangeGoogleCode(code);
        JwtAuthResponseDTO jwt = authService.oauthLogin(loginData);
        response.sendRedirect("http://localhost:3000/oauth-success?token="
                + jwt.getAccessToken() + "&userId=" + jwt.getId());
    }

    @GetMapping("/github")
    public void github(@RequestParam String code, HttpServletResponse response) throws Exception {
        OAuthLoginDTO loginData = authService.exchangeGithubCode(code);
        JwtAuthResponseDTO jwt = authService.oauthLogin(loginData);
        response.sendRedirect("http://localhost:3000/oauth-success?token="
                + jwt.getAccessToken() + "&userId=" + jwt.getId());
    }
}
