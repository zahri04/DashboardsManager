package com.example.dashboardmanagement.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle Not Found Exceptions
    @ExceptionHandler({
            AuthorityNotFoundException.class,
            DashboardAccessNotFoundException.class,
            DashboardNotFoundException.class,
            GroupNotFoundException.class,
            UserNotFoundException.class
    })
    public ResponseEntity<String> handleNotFoundException(RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    // Handle Already Exist Exceptions
    @ExceptionHandler({
            DashboardNameAlreadyExistException.class,
            UsernameAlreadyExistException.class,
            AuthorityNameAlreadyExistException.class,
            DashboardAccessAlreadyExistException.class,
            GroupNameAlreadyExistException.class
    })
    public ResponseEntity<String> handleAlreadyExistException(Exception ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    // Handle Validation and Permission Exceptions
    @ExceptionHandler({
            PasswordConfirmationFailedException.class,
            PermissionDeniedException.class,
            UnauthorizedActionException.class,
            UserNotEnabledException.class,
            ValidationException.class
    })
    public ResponseEntity<String> handleValidationOrPermissionException(Exception ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    // Optional: Uncomment if you want to handle this specifically
    /*
    @ExceptionHandler(ConcurrentModificationException.class)
    public ResponseEntity<String> handleConcurrentModificationException(ConcurrentModificationException ex) {
        return ResponseEntity.status(409).body("Concurrent modification error: " + ex.getMessage());
    }
    */
}
