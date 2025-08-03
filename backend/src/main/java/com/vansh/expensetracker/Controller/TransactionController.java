package com.vansh.expensetracker.Controller;

import java.time.LocalDate;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vansh.expensetracker.DTO.TransactionDTO;
import com.vansh.expensetracker.Service.TransactionService;

@Slf4j
@RestController
@RequestMapping("/api/transaction")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<?> addTransaction(@RequestBody TransactionDTO transactionDTO) {
        TransactionDTO created = transactionService.addTransaction(transactionDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAllTransactions(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        log.trace("Filtering transactions...");
        List<TransactionDTO> transactions = transactionService.getAllTransactions(title, type, category, startDate, endDate);
        log.info("Filtering complete");

        log.info(transactions.toString());
        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(@PathVariable Long id, @RequestBody TransactionDTO transactionDTO) {
        TransactionDTO updated = transactionService.updateTransaction(id, transactionDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransactionById(id);
        return ResponseEntity.ok("Transaction deleted successfully.");
    }
}
