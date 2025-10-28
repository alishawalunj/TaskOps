package com.nzefler.auth.service;

import com.nzefler.auth.dto.*;
import com.nzefler.auth.entity.OAuthProvider;
import com.nzefler.auth.entity.User;
import com.nzefler.auth.mapper.UserMapper;
import com.nzefler.auth.repository.UserRepository;
import com.nzefler.auth.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthServiceImpl(UserRepository userRepository, UserMapper mapper, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public UserResponseDTO register(NewUserDTO newUserDTO) {
        if (userRepository.findByEmail(newUserDTO.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + newUserDTO.getEmail());
        }
        User user = mapper.toEntity(newUserDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProvider(newUserDTO.getProvider() == null ? OAuthProvider.LOCAL : newUserDTO.getProvider());
        User savedUser = userRepository.save(user);
        return mapper.toDTO(savedUser);
    }

    @Override
    public JwtAuthResponseDTO login(LoginDTO loginDTO, AuthenticationManager authenticationManager) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );

        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new RuntimeException("User not found after authentication"));
        Long id = user.getId();
        String accessToken = jwtTokenProvider.generateToken(authentication, user.getId());
        System.out.println("In Authservice while logging in "+ accessToken);
        return new JwtAuthResponseDTO(accessToken,id);
    }


}
