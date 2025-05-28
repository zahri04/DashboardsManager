package com.example.dashboardmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
// the data which normal user can access to visualize a dashboard (Metabase...)
public class DashboardViewDto {

    private Long id;

    private String name;

    private String description;
}
