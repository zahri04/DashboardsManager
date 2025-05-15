package com.example.dashboardmanagement.exception;

public class AuthorityNameAlreadyExistException extends RuntimeException {
    public AuthorityNameAlreadyExistException(String name) {

        super("authority With the name " + name + " already exists");
    }

}
