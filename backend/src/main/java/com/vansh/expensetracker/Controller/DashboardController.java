package com.vansh.expensetracker.Controller;

import com.vansh.expensetracker.DTO.DashboardDTO;
import com.vansh.expensetracker.Service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats(
            Principal principal, // ✅ get logged-in user
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        DashboardDTO stats = dashboardService.getDashboardStats(principal.getName(), startDate, endDate);
        return ResponseEntity.ok(stats);
    }
}
