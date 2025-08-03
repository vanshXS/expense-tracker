package com.vansh.expensetracker.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.vansh.expensetracker.DTO.CategoryExpenseDTO;
import com.vansh.expensetracker.DTO.MonthlySummaryDTO;
import com.vansh.expensetracker.Entity.Transaction;
import com.vansh.expensetracker.Entity.User;
import com.vansh.expensetracker.Entity.type;
import com.vansh.expensetracker.Repository.TransactionRepo;
import com.vansh.expensetracker.Repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChartService {

    private final TransactionRepo transactionRepository;
    private final UserRepo userRepo;

    public List<CategoryExpenseDTO> getExpenseBreakdown(String userEmail, LocalDate startDate, LocalDate endDate) {
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Specification<Transaction> spec = TransactionSpecification.getTransactionsByFilters(
                user, null, "EXPENSE", null, startDate, endDate
        );

        List<Transaction> transactions = transactionRepository.findAll(spec);

        Map<String, Double> categoryTotals = new HashMap<>();
        for (Transaction transaction : transactions) {
            String category = transaction.getCategory();
            double amount = transaction.getAmount();
            categoryTotals.put(category, categoryTotals.getOrDefault(category, 0.0) + amount);
        }

        List<CategoryExpenseDTO> result = new ArrayList<>();
        for (Map.Entry<String, Double> entry : categoryTotals.entrySet()) {
            result.add(new CategoryExpenseDTO(entry.getKey(), entry.getValue()));
        }

        return result;
    }

    public List<MonthlySummaryDTO> getIncomeExpenseSummary(String userEmail, int months) {
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusMonths(months - 1).withDayOfMonth(1);

        Specification<Transaction> spec = TransactionSpecification.getTransactionsByFilters(
                user, null, null, null, startDate, endDate
        );

        List<Transaction> transactions = transactionRepository.findAll(spec);

        Map<String, MonthlySummaryDTO> monthlySummaries = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");

        for (Transaction transaction : transactions) {
            String month = transaction.getDate().format(formatter);
            monthlySummaries.putIfAbsent(month, new MonthlySummaryDTO(month, 0.0, 0.0));

            MonthlySummaryDTO summary = monthlySummaries.get(month);
            if (transaction.getType() == type.INCOME) {
                summary.setIncome(summary.getIncome() + transaction.getAmount());
            } else {
                summary.setExpense(summary.getExpense() + transaction.getAmount());
            }
        }

        return new ArrayList<>(monthlySummaries.values());
    }
}
