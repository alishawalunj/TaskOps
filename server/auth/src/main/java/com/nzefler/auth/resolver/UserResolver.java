package com.nzefler.auth.resolver;

import com.nzefler.auth.dto.UserDTO;
import com.nzefler.auth.entity.User;
import com.nzefler.auth.service.UserService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserResolver {
    private final UserService userService;

    public UserResolver(UserService userService) {
        this.userService = userService;
    }

    @QueryMapping
    public UserDTO getUserById(@Argument Long id) {
        return userService.findUserById(id);
    }

    @QueryMapping
    public List<UserDTO> getAllUsers() {
        return userService.findAllUsers();
    }

    @MutationMapping
    public UserDTO createUser(@Argument("user") User user) {
        return userService.saveUser(user);
    }

    @MutationMapping
    public UserDTO updateUser(@Argument("user") User user) {
        return userService.updateUser(user);
    }

    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {
        return userService.deleteUser(id);
    }

}
