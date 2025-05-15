package com.example.dashboardmanagement.service;

import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.exception.GroupNotFoundException;
import com.example.dashboardmanagement.exception.UserNotEnabledException;
import com.example.dashboardmanagement.exception.UsernameAlreadyExistException;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.model.User;
import com.example.dashboardmanagement.repository.GroupRepo;
import com.example.dashboardmanagement.repository.UserRepo;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired

    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private UserRepo userRepo;


    @Transactional
    public String register(@Valid UserDto userDto) {
        if (userRepo.existsByUsername(userDto.getUsername())) {
            throw new UsernameAlreadyExistException(userDto.getUsername());
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        if (userDto.getFullName() != null) {
            user.setFullName(userDto.getFullName());
        }

        // when registering if user sent(or An Attacker Sent Enabled:true)
        if (userDto.getEnabled() != null) {
            userDto.setEnabled(false);
        }
        user.setEnabled(userDto.getEnabled());

        List<String> groupNames = userDto.getGroupNames();
        Set<Group> groups = groupRepo.findAllByNameIn(groupNames).stream().collect(Collectors.toSet());

        if (groups.size() != groupNames.size()) {
            throw new GroupNotFoundException("Some Groups are not found");
        } else {
            user.setGroups(groups);
        }

        user.setPassword(encoder.encode(userDto.getPassword())); // Encode password
        User saved = userRepo.save(user);
        return "User Registered Successfully!";
    }

    @Transactional
    public String verify(@Valid UserDto userDto) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));

        if (!auth.isAuthenticated()) {
            throw new BadCredentialsException("Invalid username or password.");
        }

        Object principal = auth.getPrincipal();
        if (principal instanceof User user && !user.getEnabled()) {
            throw new UserNotEnabledException(user.getUsername());
        }

        return jwtService.generateToken(userDto.getUsername());
    }

}


