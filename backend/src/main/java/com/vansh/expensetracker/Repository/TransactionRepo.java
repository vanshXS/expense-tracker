package com.vansh.expensetracker.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.vansh.expensetracker.Entity.Transaction;
import com.vansh.expensetracker.Entity.User;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {

        List<Transaction> findByUser(User user);
}
