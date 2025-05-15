package com.example.dashboardmanagement.exception;

public class PermissionDeniedException extends RuntimeException {

    public PermissionDeniedException(){
        super("Operation Is Denied");
    }
}
