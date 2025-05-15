package com.example.dashboardmanagement.exception;

public class PasswordConfirmationFailedException extends RuntimeException{
    public PasswordConfirmationFailedException(){
        super("Password Confirmation Failed.");

    }
}
