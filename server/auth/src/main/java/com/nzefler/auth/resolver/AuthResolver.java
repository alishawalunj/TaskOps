package com.nzefler.auth.resolver;

import com.nzefler.auth.dto.JwtAuthResponse;
import com.nzefler.auth.dto.LoginDTO;
import com.nzefler.auth.dto.UserDTO;
import com.nzefler.auth.service.AuthService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class AuthResolver {
    private final AuthService authService;


    public AuthResolver(AuthService authService) {
        this.authService = authService;
    }

    @MutationMapping
    public UserDTO registerUser(@Argument("user") UserDTO userDTO) {
        return authService.register(userDTO);
    }

    @MutationMapping
    public JwtAuthResponse loginUser(@Argument("credentials") LoginDTO loginDTO) {
        return authService.login(loginDTO);
    }

}
