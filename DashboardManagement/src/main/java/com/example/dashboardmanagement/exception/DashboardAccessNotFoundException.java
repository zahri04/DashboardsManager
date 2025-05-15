package com.example.dashboardmanagement.exception;

public class DashboardAccessNotFoundException extends RuntimeException {
    public DashboardAccessNotFoundException(Long group_id,Long dashboard_id) {
        super("Dashboard Access Not Found with  group id " + group_id + " and dashboard id " + dashboard_id);
    }
}
