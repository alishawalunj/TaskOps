package com.nzefler.auth.service;

import com.nzefler.auth.dto.JwtAuthResponse;
import com.nzefler.auth.dto.LoginDTO;
import com.nzefler.auth.dto.UserDTO;
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
    public UserDTO register(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + userDTO.getEmail());
        }
        User user = mapper.toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProvider(userDTO.getProvider() == null ? OAuthProvider.LOCAL : userDTO.getProvider());
        User savedUser = userRepository.save(user);
        return mapper.toDTO(savedUser);
    }

    @Override
    public JwtAuthResponse login(LoginDTO loginDTO, AuthenticationManager authenticationManager) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );
        String accessToken = jwtTokenProvider.generateToken(authentication);
        return new JwtAuthResponse(accessToken);
    }

}
