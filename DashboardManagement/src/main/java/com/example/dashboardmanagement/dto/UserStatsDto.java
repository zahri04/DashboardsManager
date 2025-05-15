package com.example.dashboardmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
public class UserStatsDto {

    private String fullName;

    private List<String> groups=new ArrayList<>();
    private LocalDateTime registrationDate;
}
