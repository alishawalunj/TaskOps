package com.nzefler.auth.service;

import com.nzefler.auth.dto.NewUserDTO;
import com.nzefler.auth.dto.UserRequestDTO;
import com.nzefler.auth.dto.UserResponseDTO;


import java.util.List;

public interface UserService {
    UserResponseDTO findUserById(Long id);
    List<UserResponseDTO> findAllUsers();
    UserResponseDTO saveUser(NewUserDTO newUserDTO);
    UserResponseDTO updateUser(UserRequestDTO userRequestDTO);
    boolean deleteUser(Long id);
    UserResponseDTO findUserByEmail(String email);
}
