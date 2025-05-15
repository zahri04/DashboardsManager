package com.example.dashboardmanagement.repository;

import com.example.dashboardmanagement.model.DashboardAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardAccessIdRepo extends JpaRepository<DashboardAccess, Long>
{
}
