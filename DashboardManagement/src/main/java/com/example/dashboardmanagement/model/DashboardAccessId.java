package com.example.dashboardmanagement.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

@Embeddable
// annotation for Composite Keys in JPA
public class DashboardAccessId{

    // a Composite Key Object Of DashboardAccessId

    private Long group_id;
    private Long dashboard_id;

    public DashboardAccessId(Long group_id,Long dashboard_id){
        this.group_id = group_id;
        this.dashboard_id = dashboard_id;

    }
}
