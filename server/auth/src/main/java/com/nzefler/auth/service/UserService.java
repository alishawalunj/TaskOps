package com.nzefler.auth.service;

import com.nzefler.auth.dto.UserDTO;
import com.nzefler.auth.entity.User;


import java.util.List;

public interface UserService {
    UserDTO findUserById(Long id);
    List<UserDTO> findAllUsers();
    UserDTO updateUser(User user);
    boolean deleteUser(Long id);
}
