package com.vansh.expensetracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryExpenseDTO {
    private String category;
    private Double amount;
}
