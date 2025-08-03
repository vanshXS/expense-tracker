package com.vansh.expensetracker.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vansh.expensetracker.Entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User>findByEmail(String email);
}
