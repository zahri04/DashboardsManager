package com.example.dashboardmanagement.controller;

import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.exception.UserNotEnabledException;
import com.example.dashboardmanagement.service.AuthService;
import com.example.dashboardmanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("Invalid input data: " + bindingResult.getAllErrors());
        }

        return ResponseEntity.ok(authService.register(userDto));


    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid input: " + bindingResult.getAllErrors());
        }

        try {
            String token = authService.verify(userDto);
            return ResponseEntity.ok(token); // You can wrap this in a DTO if needed
        } catch (UserNotEnabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed: " + e.getMessage());
        }
    }

}
