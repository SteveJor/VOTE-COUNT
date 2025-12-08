package com.example.backend.service;

import com.example.backend.model.Electeur;
import com.example.backend.repository.ElecteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private ElecteurRepository electeurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Electeur authenticate(String numeroCNI, String password) {
        Optional<Electeur> electeurOpt = electeurRepository.findByNumeroCNI(numeroCNI);
        if (electeurOpt.isPresent()) {
            Electeur electeur = electeurOpt.get();
            if (passwordEncoder.matches(password, electeur.getPassword())) {
                return electeur;
            }
        }
        return null;
    }

    public void register(Electeur electeur) {
        electeur.setPassword(passwordEncoder.encode(electeur.getPassword()));
        electeur.setSignature(passwordEncoder.encode(electeur.getSignature())); // Secure signature
        electeurRepository.save(electeur);
    }
}
