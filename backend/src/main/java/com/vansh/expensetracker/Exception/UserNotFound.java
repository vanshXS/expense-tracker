package com.vansh.expensetracker.Exception;


public class UserNotFound extends RuntimeException{

    public UserNotFound(String message) {
        super(message);
    }
}
