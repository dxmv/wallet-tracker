package com.tracker.server.exceptions;

public class ConflictException extends RuntimeException{
    public ConflictException(String msg){
        super(msg);
    }
}
