package com.example.dashboardmanagement.exception;

public class UserNotEnabledException extends RuntimeException {

    public UserNotEnabledException(String username) {
        super(username+ " is not enabled, Please Wait For Approval From Admin");
    }

}
