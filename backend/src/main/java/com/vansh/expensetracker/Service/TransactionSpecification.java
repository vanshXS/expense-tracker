package com.vansh.expensetracker.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.vansh.expensetracker.Entity.Transaction;
import com.vansh.expensetracker.Entity.User;

import jakarta.persistence.criteria.Predicate;



public class TransactionSpecification {
    public static Specification<Transaction> getTransactionsByFilters(
            User user,
            String title,
            String type,
            String category,
            LocalDate startDate,
            LocalDate endDate
    ) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (user != null) {
                predicates.add(cb.equal(root.get("user"), user));
            }

            if (title != null && !title.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
            }

            if (type != null && !type.isEmpty()) {
                predicates.add(cb.equal(root.get("type"), com.vansh.expensetracker.Entity.type.valueOf(type.toUpperCase())));
            }

            if (category != null && !category.isEmpty()) {
                predicates.add(cb.equal(root.get("category"), category));
            }

            if (startDate != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("date"), startDate));
            }

            if (endDate != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("date"), endDate));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}


