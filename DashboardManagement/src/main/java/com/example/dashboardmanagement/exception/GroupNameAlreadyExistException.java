package com.example.dashboardmanagement.exception;

public class GroupNameAlreadyExistException extends RuntimeException {
    public GroupNameAlreadyExistException(String name) {


      super("group name already exists: " + name);
    }
}
