package com.example.dashboardmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardAccessDto {
    private Long dashboard_id;
    private Long group_id;

    private boolean canView;
    private boolean canEdit;
}
