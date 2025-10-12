package com.nzefler.auth.service;

import com.nzefler.auth.dto.UserDTO;
import com.nzefler.auth.entity.User;
import com.nzefler.auth.mapper.UserMapper;
import com.nzefler.auth.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper mapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @Override
    public UserDTO findUserById(Long id) {
        return userRepository.findById(id).map(mapper::toDTO).orElse(null);
    }

    @Override
    public List<UserDTO> findAllUsers() {
        return userRepository.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(User user) {
        return mapper.toDTO(userRepository.save(user));
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
