package com.vansh.expensetracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
public class DashboardDTO {

    private double totalIncome;
    private double totalExpense;
    private double balance;
    private long transactionCount;
}
