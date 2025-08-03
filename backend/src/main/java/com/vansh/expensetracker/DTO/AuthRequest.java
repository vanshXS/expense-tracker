package com.vansh.expensetracker.DTO;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class AuthRequest {
    private String name;
    private String email;
    private String password;
}
