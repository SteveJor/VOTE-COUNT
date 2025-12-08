package com.example.backend.controller;

import com.example.backend.model.Electeur;
import com.example.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend access
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String numeroCNI, @RequestParam String password) {
        Electeur electeur = authService.authenticate(numeroCNI, password);
        if (electeur != null) {
            return ResponseEntity.ok(electeur);
        }
        return ResponseEntity.status(401).body("Identifiants incorrects");
    }
}
