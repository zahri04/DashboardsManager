package com.example.dashboardmanagement.dto;

import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@NoArgsConstructor
@Getter
@Setter
public class UserDto {

    private Long id;

    @NotEmpty(message = "username cannot be Empty")
    @Size(min = 8,max = 12,message = "username should be length of 8-12")
    private String username;

    @NotEmpty(message = "Full Name Cannot be Empty")
    private String fullName;

    @NotNull(message = "User Status Cannot be empty (Enabled)")
    private Boolean enabled=false;


    private String password;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    private LocalDateTime created_at;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    private LocalDateTime updated_at;
    private List<String> groupNames = new ArrayList<>();




}
