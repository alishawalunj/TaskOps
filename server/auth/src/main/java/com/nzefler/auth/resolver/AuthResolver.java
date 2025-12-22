package com.nzefler.auth.resolver;

import com.nzefler.auth.dto.*;
import com.nzefler.auth.service.AuthService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;

@Controller
public class AuthResolver {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;

    public AuthResolver(AuthService authService, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
    }

    @MutationMapping
    public JwtAuthResponseDTO loginUser(@Argument("credentials") LoginDTO loginDTO) {
        return authService.login(loginDTO, authenticationManager);
    }

    @MutationMapping
    public JwtAuthResponseDTO loginOAuthUser(@Argument("credentials") OAuthLoginDTO dto) {
        return authService.oauthLogin(dto);
    }


    @QueryMapping
    public OAuthRedirectUrlResponse getGoogleRedirectUrl(){
        return authService.buildGoogleRedirectUrl();
    }

    @QueryMapping
    public OAuthRedirectUrlResponse getGithubRedirectUrl(){
        return authService.buildGithubRedirectUrl();
    }
}
