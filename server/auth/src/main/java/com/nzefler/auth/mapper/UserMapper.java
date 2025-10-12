package com.nzefler.auth.mapper;

import com.nzefler.auth.dto.UserDTO;
import com.nzefler.auth.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserDTO userDto){
        User user = new User();
        user.setId(userDto.getId());
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAddress(userDto.getAddress());
        user.setProvider(userDto.getProvider());
        user.setAge(userDto.getAge());
        user.setSex(userDto.getSex());
        return user;
    }

    public UserDTO toDTO(User user){
        UserDTO userDto = new UserDTO();
        userDto.setId(user.getId());
        userDto.setUserName(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setAddress(user.getAddress());
        userDto.setProvider(user.getProvider());
        userDto.setAge(user.getAge());
        userDto.setSex(user.getSex());
        return userDto;
    }
}
