package com.nzefler.auth.mapper;

import com.nzefler.auth.dto.NewUserDTO;
import com.nzefler.auth.dto.UserResponseDTO;
import com.nzefler.auth.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(NewUserDTO newUserDTO){
        if(newUserDTO == null) return null;
        User u = new User();
        u.setUserName(newUserDTO.getUserName());
        u.setEmail(newUserDTO.getEmail());
        u.setPassword(newUserDTO.getPassword());
        u.setProvider(newUserDTO.getProvider());
        u.setAddress(newUserDTO.getAddress());
        u.setAge(newUserDTO.getAge());
        u.setSex(newUserDTO.getSex());
        return u;
    }

    public UserResponseDTO toDTO(User u){
        if(u == null) return null;
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(u.getId());
        userResponseDTO.setUserName(u.getUserName());
        userResponseDTO.setEmail(u.getEmail());
        userResponseDTO.setPassword(u.getPassword());
        userResponseDTO.setProvider(u.getProvider());
        userResponseDTO.setAddress(u.getAddress());
        userResponseDTO.setAge(u.getAge());
        userResponseDTO.setSex(u.getSex());
        return userResponseDTO;
    }
}
