package com.example.dashboardmanagement.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
// this Dto for Rendering group Names in the Registration Form(React Frontend)
public class PublicGroupDto {
    private String groupName;
}
