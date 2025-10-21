package com.nzefler.auth.mapper;

import com.nzefler.auth.dto.UserDTO;
import com.nzefler.auth.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserDTO dto){
        if(dto == null) return null;
        User u = new User();
        u.setId(dto.getId());
        u.setUserName(dto.getUserName());
        u.setEmail(dto.getEmail());
        u.setPassword(dto.getPassword());
        u.setProvider(dto.getProvider());
        u.setAddress(dto.getAddress());
        u.setAge(dto.getAge());
        u.setSex(dto.getSex());
        return u;
    }

    public UserDTO toDTO(User u){
        if(u == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(u.getId());
        dto.setUserName(u.getUserName());
        dto.setEmail(u.getEmail());
        dto.setPassword(u.getPassword());
        dto.setProvider(u.getProvider());
        dto.setAddress(u.getAddress());
        dto.setAge(u.getAge());
        dto.setSex(u.getSex());
        return dto;
    }
}
