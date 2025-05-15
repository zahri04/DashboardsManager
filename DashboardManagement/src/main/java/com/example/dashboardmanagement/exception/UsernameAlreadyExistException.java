package com.example.dashboardmanagement.exception;

public class UsernameAlreadyExistException extends RuntimeException {
    public UsernameAlreadyExistException(String name) {
        super("Username is already taken."+name);
    }
    public UsernameAlreadyExistException(Long id) {
        super("Username is already taken. of id: "+id);
    }
}
