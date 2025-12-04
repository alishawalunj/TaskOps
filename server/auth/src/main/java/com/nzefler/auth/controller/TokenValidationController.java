package com.nzefler.auth.controller;

import com.nzefler.auth.dto.UserTokenDTO;
import com.nzefler.auth.security.jwt.JwtTokenProvider;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class TokenValidationController {

    private final JwtTokenProvider jwtTokenProvider;

    public TokenValidationController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/validate-token")
    public UserTokenDTO validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        if (!jwtTokenProvider.validateToken(token)) {
            throw new RuntimeException("Invalid token");
        }
        Long userId = jwtTokenProvider.extractUserId(token);
        String email = jwtTokenProvider.extractEmail(token);
        return new UserTokenDTO(userId, email);
    }
}
