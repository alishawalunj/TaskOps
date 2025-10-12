package com.nzefler.auth.service;

import com.nzefler.auth.dto.JwtAuthResponse;
import com.nzefler.auth.dto.LoginDTO;
import com.nzefler.auth.dto.UserDTO;
import com.nzefler.auth.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;

    public AuthServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }


    @Override
    public UserDTO register(UserDTO userDTO) {
        return null;
    }

    @Override
    public JwtAuthResponse login(LoginDTO loginDTO) {
        return null;
    }
}
