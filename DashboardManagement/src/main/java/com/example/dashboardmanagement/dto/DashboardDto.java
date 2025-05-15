package com.example.dashboardmanagement.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DashboardDto {
    private long id;
    @NotNull(message = "Dashboard Name Cannot Be Null")
    private String name;
    @NotNull(message="the name is Missing")
    private String description;
    @NotNull(message = "the base_url is missing")
    private String base_url;
    @NotNull(message = "the secret key is Missing")
    private String secret_key;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    private LocalDateTime created_at;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    private LocalDateTime updated_at;

    // Simplified user representation
    private Long created_by_id;
    private String created_by_username;
}
