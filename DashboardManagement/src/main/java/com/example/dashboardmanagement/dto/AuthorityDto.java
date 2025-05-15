package com.example.dashboardmanagement.dto;

import lombok.*;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthorityDto {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
