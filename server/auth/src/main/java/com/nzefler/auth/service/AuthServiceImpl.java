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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthServiceImpl implements AuthService, UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(UserRepository userRepository, UserMapper mapper, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
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
    public JwtAuthResponse login(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid email or password"));
//        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
//            throw new RuntimeException("Invalid email or password");
//        }
        String accessToken = jwtTokenProvider.generateToken(loginDTO.getEmail());
        return new JwtAuthResponse(accessToken);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()
        );
    }
}
