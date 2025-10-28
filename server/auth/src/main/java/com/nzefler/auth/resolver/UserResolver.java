package com.nzefler.auth.resolver;

import com.nzefler.auth.dto.NewUserDTO;
import com.nzefler.auth.dto.UserRequestDTO;
import com.nzefler.auth.dto.UserResponseDTO;
import com.nzefler.auth.service.UserService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;

@Controller
public class UserResolver {

    private final UserService userService;

    public UserResolver(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public UserResponseDTO me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userService.findUserByEmail(email);
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public UserResponseDTO getUserById(@Argument Long id) {
        return userService.findUserById(id);
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.findAllUsers();
    }

    @PreAuthorize("isAuthenticated()")
    @MutationMapping
    public UserResponseDTO createUser(@Argument("user") NewUserDTO newUserDTO) {
        return userService.saveUser(newUserDTO);
    }

    @PreAuthorize("isAuthenticated()")
    @MutationMapping
    public UserResponseDTO updateUser(@Argument("user") UserRequestDTO userRequestDTO) {
        return userService.updateUser(userRequestDTO);
    }

    @PreAuthorize("isAuthenticated()")
    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {
        return userService.deleteUser(id);
    }
}
