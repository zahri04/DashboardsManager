package com.example.dashboardmanagement.repository;

import com.example.dashboardmanagement.model.Dashboard;
import com.example.dashboardmanagement.model.DashboardAccess;
import com.example.dashboardmanagement.model.DashboardAccessId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface DashboardAccessRepo extends JpaRepository<DashboardAccess, DashboardAccessId> {


    List<DashboardAccess> findAllByDashboard_Id(Long dashboardId);
    List<DashboardAccess> findAllByGroup_Id(Long groupId);



}
