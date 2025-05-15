package com.example.dashboardmanagement.exception;

public class DashboardAccessAlreadyExistException extends RuntimeException {
    public DashboardAccessAlreadyExistException(Long group_id, Long dashboard_id) {
       super("Dashboard access already exists for dashboard id " + dashboard_id + " and group id " + group_id);
    }
}
