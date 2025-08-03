package com.vansh.expensetracker.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDTO {
    private Long id;
    private String title;
    private Double amount;
    private String type;       // "INCOME" or "EXPENSE"
    private String category;
    private LocalDate date;
}
