package com.example.dashboardmanagement.controller;

import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.dto.UserStatsDto;
import com.example.dashboardmanagement.exception.GroupNotFoundException;
import com.example.dashboardmanagement.exception.UserNotFoundException;
import com.example.dashboardmanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasAuthority('PERM_USER_MANAGEMENT')")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }






    // Get all users
    @GetMapping
    public List<UserDto> getAllUsers() {

        List<UserDto> users=userService.getAllUsers();
        return users;
    }

    // search for users
    @GetMapping("search")

    public Page<UserDto> searchUsers(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) List<String> groupNames,
            @RequestParam(required = false) Boolean enabled,
            @RequestParam(required = false) LocalDateTime createdAfter,
            @RequestParam(required = false) LocalDateTime createdBefore,
            @RequestParam(required = false) LocalDateTime updatedAfter,
            @RequestParam(required = false) LocalDateTime updatedBefore,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(name="sort",required = false) List<String> sort



            ){

        Page<UserDto> users= userService.searchUsers(username,fullName,enabled,createdAfter,createdBefore,updatedAfter,updatedBefore,groupNames,pageNumber,pageSize,
                sort ==null ? List.of("username,asc"):sort

        );

        return users;

    }

    // Get user by ID
    @GetMapping("{id}")
    public UserDto getUserById(@PathVariable Long id) throws UserNotFoundException {
        return userService.getUserById(id);
    }

    // getting recent disabled users
    @GetMapping("disabledUsers")
    public List<UserStatsDto> getDisabledUsers(){
        List<UserStatsDto> users=userService.getDisabledUsers();
        return users;
    }

    // Add user
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto addUser(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("Invalid input data: " + bindingResult.getAllErrors());
        }
        return userService.addUser(userDto);
    }


    // Update user
    // @valid is not required , because we may send only some fields of UserDto
    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // If validation fails, we return a custom error response
            throw new IllegalArgumentException("Invalid input data: " + bindingResult.getAllErrors());
        }
        userDto.setId(id);
        return  ResponseEntity.ok(userService.updateUser(userDto)) ;
    }

    // Delete user
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) throws UserNotFoundException {
        userService.deleteUser(id);
        return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
    }


}
