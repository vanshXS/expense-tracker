package com.vansh.expensetracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
public class MonthlySummaryDTO {

    private String month;
    private Double income;
    private Double expense;
}
