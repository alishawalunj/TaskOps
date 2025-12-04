package com.nzefler.auth.service;

import com.nzefler.auth.dto.NewUserDTO;
import com.nzefler.auth.dto.UserRequestDTO;
import com.nzefler.auth.dto.UserResponseDTO;
import com.nzefler.auth.entity.User;
import com.nzefler.auth.mapper.UserMapper;
import com.nzefler.auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper mapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDTO findUserById(Long id) {
        return userRepository.findById(id).map(mapper::toDTO).orElse(null);
    }

    @Override
    public List<UserResponseDTO> findAllUsers() {
        return userRepository.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO saveUser(NewUserDTO newUserDTO){
        User newUser = mapper.toEntity(newUserDTO);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return mapper.toDTO(userRepository.save(newUser));
    }

    @Override
    public UserResponseDTO updateUser(UserRequestDTO userRequestDTO) {

        String email = userRequestDTO.getEmail();
        User existingUser = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setUserName(userRequestDTO.getUserName());
        existingUser.setEmail(userRequestDTO.getEmail());
        existingUser.setAddress(userRequestDTO.getAddress());
        existingUser.setAge(userRequestDTO.getAge());
        existingUser.setSex(userRequestDTO.getSex());
        existingUser.setProvider(userRequestDTO.getProvider());

        if (userRequestDTO.getPassword() != null && !userRequestDTO.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        }
        User updatedUser = userRepository.save(existingUser);
        return mapper.toDTO(updatedUser);
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
    @Override
    public UserResponseDTO findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapper.toDTO(user);
    }
}
