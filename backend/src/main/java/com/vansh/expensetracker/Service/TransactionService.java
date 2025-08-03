package com.vansh.expensetracker.Service;

import java.time.LocalDate;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.vansh.expensetracker.DTO.TransactionDTO;
import com.vansh.expensetracker.Entity.Transaction;
import com.vansh.expensetracker.Entity.User;
import com.vansh.expensetracker.Entity.type;
import com.vansh.expensetracker.Repository.TransactionRepo;
import com.vansh.expensetracker.Repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepo transactionRepository;
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;

    private TransactionDTO toDTO(Transaction transaction) {
        return TransactionDTO.builder()
                .id(transaction.getId())
                .title(transaction.getTitle())
                .amount(transaction.getAmount())
                .type(transaction.getType().name())
                .category(transaction.getCategory())
                .date(transaction.getDate())
                .build();
    }

    private Transaction toEntity(TransactionDTO dto) {
        return Transaction.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .amount(dto.getAmount())
                .type(type.valueOf(dto.getType().toUpperCase()))
                .category(dto.getCategory())
                .date(dto.getDate())
                .build();
    }

    public TransactionDTO addTransaction(TransactionDTO transactionDTO) {
        String email = getCurrentUserEmail();
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Transaction transaction = Transaction.builder()
                .title(transactionDTO.getTitle())
                .amount(transactionDTO.getAmount())
                .date(transactionDTO.getDate())
                .category(transactionDTO.getCategory())
                .user(user)
                .type(type.valueOf(transactionDTO.getType()))
                .build();

        Transaction saved = transactionRepository.save(transaction);
        return this.modelMapper.map(saved, TransactionDTO.class);
    }


    public List<TransactionDTO> getAllTransactions(String title, String type, String category, LocalDate startDate, LocalDate endDate) {
        String email = getCurrentUserEmail();
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Specification<Transaction> spec = TransactionSpecification.getTransactionsByFilters(user, title, type, category, startDate, endDate);
        return transactionRepository.findAll(spec).stream()
                .map(t -> TransactionDTO.builder()
                        .id(t.getId())
                        .title(t.getTitle())
                        .amount(t.getAmount())
                        .type(t.getType().name())
                        .category(t.getCategory())
                        .date(t.getDate())
                        .build())
                .toList();
    }

    public TransactionDTO updateTransaction(Long id, TransactionDTO transactionDTO) {
        transactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Transaction not found"));
        Transaction transaction = toEntity(transactionDTO);
        transaction.setId(id);
        Transaction updated = transactionRepository.save(transaction);
        return toDTO(updated);
    }

    public void deleteTransactionById(Long id) {
        transactionRepository.deleteById(id);
    }

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
