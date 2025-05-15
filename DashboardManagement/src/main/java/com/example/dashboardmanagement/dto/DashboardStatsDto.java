package com.example.dashboardmanagement.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDto {

    private long totalUsers;
    private long usersThisWeek;
    private long totalDashboards;
    private long totalGroups;
}
