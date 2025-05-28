package com.example.dashboardmanagement.service;

import com.example.dashboardmanagement.controller.GroupController;
import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.dto.UserStatsDto;
import com.example.dashboardmanagement.exception.GroupNotFoundException;
import com.example.dashboardmanagement.exception.UserNotFoundException;
import com.example.dashboardmanagement.exception.UsernameAlreadyExistException;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.model.User;
import com.example.dashboardmanagement.repository.GroupRepo;
import com.example.dashboardmanagement.repository.UserRepo;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.example.dashboardmanagement.utils.PaginationUtils;


@Validated
@Service
public class UserService {

    private final UserRepo userRepo;
    private final GroupRepo groupRepo;
    private final BCryptPasswordEncoder encoder;

    private final JwtService jwtService;

    @Autowired
    public UserService(UserRepo userRepo, GroupRepo groupRepo,
                       AuthenticationManager authenticationManager, BCryptPasswordEncoder BcryptEncoder, JwtService jwtService) {
        this.userRepo = userRepo;
        this.groupRepo = groupRepo;
        this.encoder = BcryptEncoder;

        this.jwtService = jwtService;
    }


    public UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setCreated_at(user.getCreatedAt());
        userDto.setUpdated_at(user.getUpdatedAt());
        userDto.setEnabled(user.getEnabled());
        userDto.setFullName(user.getFullName());

        // checking groups List if its not empty nor its null

        if(!user.getGroups().isEmpty()) {
            Set<Group> safeGroups=new HashSet<>(user.getGroups());
            userDto.setGroupNames(safeGroups.stream()
                    .map(Group::getName)
                    .collect(Collectors.toList()));
        }
        // else: the groupNames List Is empty( Already Initialised whiting the instance)

        return userDto;
    }

    public User convertToEntity(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername().toLowerCase());
        user.setEnabled(userDto.getEnabled());
        user.setFullName(userDto.getFullName());
        user.setPassword(userDto.getPassword()); // Will be encoded later
        user.setEnabled(userDto.getEnabled());

        // Validate that all groups exists and that user is accompanied with its group(s)
        List<String> groupNames = userDto.getGroupNames();
        Set<Group> groups = groupRepo.findAllByNameIn(groupNames).stream().collect(Collectors.toSet());

        if( groups.size() != groupNames.size()) {
            throw new GroupNotFoundException("Some Groups are not found");
        }else{
            user.setGroups(groups);
        }

        // groups will be empty , user doesn't have any group

        return user;
    }


    // searching for users with filters(sort's)
    public Page<UserDto> getUsers(
            String username,
            String fullName,
            Boolean enabled,
            LocalDateTime createdAfter,
            LocalDateTime createdBefore,
            LocalDateTime updatedAfter,
            LocalDateTime updatedBefore,
            List<String> groupNames,
            int pageNumber,
            int pageSize,
            List<String> sort) {

        PaginationUtils.validatePagination(pageNumber,pageSize);

        Pageable pageable= PaginationUtils.createPageRequest(pageNumber,pageSize,sort);

        Page<User> users=userRepo.searchUsers(username,fullName,enabled,createdAfter,createdBefore,updatedAfter,updatedBefore,groupNames,pageable);

         return users.map(this::convertToDto);

    };


    @Transactional
    public List<UserDto> getAllUsers() {
        return userRepo.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    @Transactional

    public UserDto getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        System.out.println(convertToDto(user));
        return convertToDto(user);
    }

    // get Recent Disabled Users

    public List<UserStatsDto> getDisabledUsers(){

        // fetching all users
        List<UserDto> users=userRepo.findByEnabled(false).stream().map(this::convertToDto).collect(Collectors.toList());
        // empty List whicch we will return
        List<UserStatsDto> disabledUsers=new ArrayList<>();
        //
        for(UserDto user:users){
            UserStatsDto usDto=new UserStatsDto(
                    user.getFullName(),
                    user.getGroupNames(),
                    user.getCreated_at()
            );

            disabledUsers.add(usDto);

        }

        return disabledUsers;
    }

    @Transactional
    public UserDto addUser(@Valid UserDto dto) {
        if (userRepo.existsByUsername(dto.getUsername().toLowerCase())) {
            throw new UsernameAlreadyExistException(dto.getUsername());
        }

        User user = convertToEntity(dto);
        user.setPassword(encoder.encode(dto.getPassword())); // Hashing password

        User saved = userRepo.save(user);
        return convertToDto(saved);
    }

    @Transactional
    public UserDto updateUser(@Valid UserDto dto) {
        User existingUser = userRepo.findById(dto.getId())
                .orElseThrow(() -> new UserNotFoundException(dto.getId()));

        // checking if the username is unique in DB
        if(dto.getUsername()!=null) {
            if (userRepo.existsByUsername(dto.getUsername()) &&
                    !existingUser.getUsername().equals(dto.getUsername())) {
                throw new UsernameAlreadyExistException(dto.getUsername());
            }
            existingUser.setUsername(dto.getUsername());
        }

        if(dto.getFullName()!=null) {
            existingUser.setFullName(dto.getFullName());
        }
        if(dto.getEnabled()!=null) {
            existingUser.setEnabled(dto.getEnabled());
        }




        // checking if password has been modified
        if(dto.getPassword()!= existingUser.getPassword() && dto.getPassword()!=null) {
            existingUser.setPassword(encoder.encode(dto.getPassword())); // re-encode updated password
        }

        if(dto.getGroupNames()!=null) {
            Set<Group> groups = groupRepo.findAllByNameIn(dto.getGroupNames())
                    .stream().collect(Collectors.toSet());
            existingUser.setGroups(groups);

        }


        User saved = userRepo.save(existingUser);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteUser(Long id) {

        User user=userRepo.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        userRepo.delete(user);
    }



}
