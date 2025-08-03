package com.vansh.expensetracker.Controller;

import com.vansh.expensetracker.DTO.CategoryExpenseDTO;
import com.vansh.expensetracker.DTO.MonthlySummaryDTO;
import com.vansh.expensetracker.Service.ChartService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chart")
@CrossOrigin(origins = "http://localhost:5173")
public class ChartController {

    private final ChartService chartService;

    @GetMapping("/expense-breakdown")
    public ResponseEntity<?> getExpenseBreakdown(
            Principal principal, // ✅ get logged-in user
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        List<CategoryExpenseDTO> data = chartService.getExpenseBreakdown(principal.getName(), startDate, endDate);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/income-expense-summary")
    public ResponseEntity<?> getIncomeExpenseSummary(
            Principal principal, // ✅ get logged-in user
            @RequestParam(defaultValue = "6") int month
    ) {
        List<MonthlySummaryDTO> data = chartService.getIncomeExpenseSummary(principal.getName(), month);
        return ResponseEntity.ok(data);
    }
}
