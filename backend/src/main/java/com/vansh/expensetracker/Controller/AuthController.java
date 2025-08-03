package com.vansh.expensetracker.Controller;

import com.vansh.expensetracker.DTO.AuthRequest;
import com.vansh.expensetracker.DTO.AuthResponse;
import com.vansh.expensetracker.DTO.Login;
import com.vansh.expensetracker.Entity.User;
import com.vansh.expensetracker.Repository.UserRepo;
import com.vansh.expensetracker.Service.JwtService;
import com.vansh.expensetracker.Service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.embedded.undertow.UndertowServletWebServer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    UserService user;
@Autowired
    JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequest authRequest) {
        if (userRepo.findByEmail(authRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        log.info("Received registration request: {}", authRequest);

        User user = new User();
        user.setName(authRequest.getName());
        user.setEmail(authRequest.getEmail());
        user.setPassword(encoder.encode(authRequest.getPassword()));

        log.info("Saving user: {}", user);

        userRepo.save(user);
        return ResponseEntity.ok("User is registered");
    }



    @PostMapping("/login")
    public ResponseEntity<?>loginUser(@RequestBody Login login) {

        UserDetails userDetails = user.loadUserByUsername(login.getEmail());
        log.info("{} is logged in", login.getEmail());
        if(!encoder.matches(login.getPassword(), userDetails.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Creditionals");
        }
        String token = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(token));


    }

}
