package com.nzefler.auth.service;
import com.nzefler.auth.dto.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserResponseDTO register(NewUserDTO newUserDTO);
    JwtAuthResponseDTO login(LoginDTO loginDTO, AuthenticationManager authenticationManager);
}
