package com.tracker.server.exceptions;

import lombok.Getter;
import lombok.Setter;

// This class is used as a response when we encounter an error
@Getter
@Setter
public class ErrorResponse {
    private int statusCode;
    private String message;

    public ErrorResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

}
