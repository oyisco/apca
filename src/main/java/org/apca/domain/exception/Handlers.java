package org.apca.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class Handlers extends Exception {
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<String> exception(Exception exception, HttpStatus httpStatus) {
        return new ResponseEntity<>(exception.getMessage(), httpStatus);
    }

}
