package com.example.dashboardmanagement.exception;

public class AuthorityNotFoundException extends  RuntimeException {
    public AuthorityNotFoundException(Long id) {
        super("Authority not found with id " + id);
    }
    public AuthorityNotFoundException(String message) {
        super(message);
    }
}
