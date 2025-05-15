package com.example.dashboardmanagement.dto;

import com.example.dashboardmanagement.model.Group;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupDto {

    private Long id;
    @NotNull(message = "Name Field is Missing")
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> authoritesList=new ArrayList<>();



}
