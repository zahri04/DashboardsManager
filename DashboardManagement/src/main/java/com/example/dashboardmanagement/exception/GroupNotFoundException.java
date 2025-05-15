package com.example.dashboardmanagement.exception;

public class GroupNotFoundException extends RuntimeException {
    public GroupNotFoundException(Long id) {
       super("Group not found with id " + id);
    }
    public GroupNotFoundException(String groupName) {
        super("Group not found with name " + groupName);
    }
}
