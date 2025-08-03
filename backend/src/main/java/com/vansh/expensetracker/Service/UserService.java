package com.vansh.expensetracker.Service;

import com.vansh.expensetracker.Entity.User;
import com.vansh.expensetracker.Repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class UserService implements UserDetailsService {

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;
    @Autowired
    @Lazy
    private  PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    @Autowired
    private UserRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User is not found"));



    }
}


