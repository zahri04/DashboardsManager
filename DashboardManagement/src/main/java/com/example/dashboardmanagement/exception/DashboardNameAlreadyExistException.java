package com.example.dashboardmanagement.exception;

public class DashboardNameAlreadyExistException extends RuntimeException {

    public DashboardNameAlreadyExistException(String name){
        super("Dashboard with the Name ' " + name + " ' already exists!");
    }
}
