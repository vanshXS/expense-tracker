package com.vansh.expensetracker.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.vansh.expensetracker.DTO.DashboardDTO;
import com.vansh.expensetracker.Entity.Transaction;
import com.vansh.expensetracker.Entity.User;
import com.vansh.expensetracker.Entity.type;
import com.vansh.expensetracker.Repository.TransactionRepo;
import com.vansh.expensetracker.Repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TransactionRepo repo;
    private final UserRepo userRepo;

    public DashboardDTO getDashboardStats(String userEmail, LocalDate startDate, LocalDate endDate) {
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Specification<Transaction> spec = TransactionSpecification.getTransactionsByFilters(
                user, null, null, null, startDate, endDate
        );

        List<Transaction> transaction = repo.findAll(spec);

        double totalIncome = transaction.stream()
                .filter(t -> t.getType() == type.INCOME)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalExpense = transaction.stream()
                .filter(t -> t.getType() == type.EXPENSE)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double balance = totalIncome - totalExpense;
        long transactionCount = transaction.size();

        return new DashboardDTO(totalIncome, totalExpense, balance, transactionCount);
    }
}
