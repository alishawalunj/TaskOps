package com.nzefler.auth.service;
import com.nzefler.auth.dto.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    JwtAuthResponseDTO login(LoginDTO loginDTO, AuthenticationManager authenticationManager);
    JwtAuthResponseDTO oauthLogin(OAuthLoginDTO dto);

    OAuthRedirectUrlResponse buildGoogleRedirectUrl();
    OAuthRedirectUrlResponse buildGithubRedirectUrl();

    OAuthLoginDTO exchangeGoogleCode(String code);
    OAuthLoginDTO exchangeGithubCode(String code);
}
