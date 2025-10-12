package com.nzefler.auth.service;
import com.nzefler.auth.dto.JwtAuthResponse;
import com.nzefler.auth.dto.LoginDTO;
import com.nzefler.auth.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserDTO register(UserDTO userDTO);
    JwtAuthResponse login(LoginDTO loginDTO);
}
