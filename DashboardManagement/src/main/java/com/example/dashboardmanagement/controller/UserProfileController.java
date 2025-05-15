package com.example.dashboardmanagement.controller;

import com.example.dashboardmanagement.dto.UserEditProfileDto;
import com.example.dashboardmanagement.dto.UserProfileDto;
import com.example.dashboardmanagement.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;


    @GetMapping
    public UserProfileDto getProfile(Authentication authentication){
        String username= authentication.getName();
        return userProfileService.getUserProfile(username);



    }

    @PutMapping

    public ResponseEntity<?> updateProfile(@RequestBody UserEditProfileDto userEditProfileDto,Authentication authentication){

        String username= authentication.getName();
        userProfileService.updateUserProfile(userEditProfileDto,username);
        return ResponseEntity.ok(" User Updated Successfully");


    }
}
