package com.vansh.expensetracker.Controller;

import com.vansh.expensetracker.DTO.UserDTO;
import com.vansh.expensetracker.Entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173") // Or your frontend URL
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getCurrentUserProfile() {
        // Get the currently authenticated user principal from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        // Create a DTO to safely transfer user data
        UserDTO userDTO = new UserDTO(
                currentUser.getUser_id(),
                currentUser.getName(),
                currentUser.getEmail()
        );

        return ResponseEntity.ok(userDTO);
    }
}