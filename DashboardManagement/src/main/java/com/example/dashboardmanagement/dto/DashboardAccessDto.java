package com.example.dashboardmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardAccessDto {
    private Long dashboardId;
    private Long groupId;
    private String groupName;
    private String dashboardName;
    private boolean canView;
    private boolean canEdit;
}
