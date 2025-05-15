package com.example.dashboardmanagement.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="dashboard_access")
public class DashboardAccess {

    @EmbeddedId
    private DashboardAccessId id;

    @ManyToOne
    @MapsId("dashboard_id")
    @JoinColumn(name="dashboard_id")

    private Dashboard dashboard;

    @ManyToOne
    @MapsId("group_id")
    @JoinColumn(name="group_id")
    private Group group;

    @Column(name="can_view")
    private boolean canView = false;

    @Column(name = "can_edit")
    private boolean canEdit = false;



}
