package com.example.dashboardmanagement.service;


import com.example.dashboardmanagement.dto.UserEditProfileDto;
import com.example.dashboardmanagement.dto.UserProfileDto;
import com.example.dashboardmanagement.exception.PasswordConfirmationFailedException;
import com.example.dashboardmanagement.exception.UserNotFoundException;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.model.User;
import com.example.dashboardmanagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UserProfileService {


    @Autowired
    private UserRepo userRepo;
    @Autowired
    private BCryptPasswordEncoder encoder;


    public UserProfileDto getUserProfile(String username){

        User user= userRepo.findByUsername(username).orElseThrow(()-> new UserNotFoundException(username));
        return new UserProfileDto(
        user.getUsername(),
        user.getFullName(),
        user.getGroups().stream().map(Group::getName).collect(Collectors.toList())
);


    }

    public void updateUserProfile(UserEditProfileDto userProfileDto,String AuthUserName){

        // the AuthUserName is user for ensuring that the same authenticated user is the one trying to update

        User user= userRepo.findByUsername(AuthUserName)
                .orElseThrow(()->new UserNotFoundException(AuthUserName));

        // checking if the password Confirmation is Correct(it extends Frontend Validation, which can be escaped with Html Injection)
        if(userProfileDto.getPassword()!=null){
            if(!userProfileDto.getPassword().equals(userProfileDto.getConfirmPassword())){
                throw new PasswordConfirmationFailedException();
            }
            user.setPassword(encoder.encode(userProfileDto.getPassword()));
        }



        if(userProfileDto.getFullName()!=null){
            user.setFullName(userProfileDto.getFullName());

        }

        //  ! User Can't change his GroupNames , Read Only

        userRepo.save(user);
    }
}
