package com.nzefler.auth.service;

import com.nzefler.auth.dto.*;
import com.nzefler.auth.entity.OAuthProvider;
import com.nzefler.auth.entity.User;
import com.nzefler.auth.repository.UserRepository;
import com.nzefler.auth.security.jwt.JwtTokenProvider;
import com.nzefler.auth.util.GoogleOAuthClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final GoogleOAuthClient googleClient;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String githubClientId;

    @Value("${spring.security.oauth2.client.registration.github.redirect-uri}")
    private String githubRedirectUri;


    public AuthServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, GoogleOAuthClient googleClient) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.googleClient = googleClient;
    }

    @Override
    public JwtAuthResponseDTO login(LoginDTO loginDTO, AuthenticationManager authenticationManager) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new RuntimeException("User not found after authentication"));
        Long id = user.getId();
        String accessToken = jwtTokenProvider.generateToken(authentication, user.getId());
        return new JwtAuthResponseDTO(accessToken,id);
    }

    @Override
    public JwtAuthResponseDTO oauthLogin(OAuthLoginDTO dto) {
        OAuthProvider provider = OAuthProvider.valueOf(dto.getProvider().toUpperCase());

        User user = userRepository.findByProviderAndProviderId(provider, dto.getProviderId())
                .orElseGet(() -> {
                    if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
                        return userRepository.findByEmail(dto.getEmail())
                                .map(existing -> {
                                    existing.setProvider(provider);
                                    existing.setProviderId(dto.getProviderId());
                                    return userRepository.save(existing);
                                })
                                .orElseGet(() -> registerOAuthUser(dto));
                    }
                    return registerOAuthUser(dto);
                });

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getId());
        return new JwtAuthResponseDTO(token, user.getId());
    }


    @Override
    public OAuthRedirectUrlResponse buildGoogleRedirectUrl() {
        String url = "https://accounts.google.com/o/oauth2/v2/auth"
                + "?client_id=" + googleClientId
                + "&redirect_uri=" + googleRedirectUri
                + "&response_type=code"
                + "&scope=openid%20email%20profile";
        System.out.println(url);
        return new OAuthRedirectUrlResponse(url);
    }

    @Override
    public OAuthRedirectUrlResponse buildGithubRedirectUrl() {
        String url = "https://github.com/login/oauth/authorize"
                + "?client_id=" + githubClientId
                + "&redirect_uri=" + githubRedirectUri
                + "&scope=read:user%20user:email";
        System.out.println(url);
        return new OAuthRedirectUrlResponse(url);
    }

    @Override
    public OAuthLoginDTO exchangeGoogleCode(String code) {
        return googleClient.exchangeCode(code);
    }

    @Override
    public OAuthLoginDTO exchangeGithubCode(String code) {
        return googleClient.exchangeGithubCode(code);
    }

    private User registerOAuthUser(OAuthLoginDTO dto) {
        User u = new User();
        u.setUserName(dto.getUserName());
        u.setEmail(dto.getEmail());
        u.setProvider(OAuthProvider.valueOf(dto.getProvider().toUpperCase()));
        u.setProviderId(dto.getProviderId());
        u.setPassword(null);
        return userRepository.save(u);
    }
}
