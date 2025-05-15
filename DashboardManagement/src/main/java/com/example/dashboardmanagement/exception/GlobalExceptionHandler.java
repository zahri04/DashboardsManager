package com.example.dashboardmanagement.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ConcurrentModificationException;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler({AuthorityNotFoundException.class, DashboardAccessNotFoundException.class, DashboardNotFoundException.class,GroupNotFoundException.class, UserNotFoundException.class})

    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.badRequest().body(ex.getMessage());

    }
//    @ExceptionHandler(ConcurrentModificationException.class)
//
//    public ResponseEntity<String> handleConcurrentModificationException(RuntimeException ex){
//        return ResponseEntity.badRequest().body(ex.getMessage());
//
//    }

    @ExceptionHandler({DashboardNameAlreadyExistException.class, UsernameAlreadyExistException.class,AuthorityNameAlreadyExistException.class})

    public ResponseEntity<String> handleException(Exception ex){
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

}
