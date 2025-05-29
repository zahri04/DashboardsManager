package com.example.dashboardmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MetabaseDto {

    private Long DashboardId;
    private String Base_url;
    private String iframeSrc;
}
