import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { passwordConf } from '../password-conf/password-conf';

@Component({
  // ⚠️ Modification du sélecteur pour suivre la convention (si nécessaire)
  selector: 'app-login', 
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    passwordConf
  ],
  templateUrl: './login.html', 
  styleUrls: ['./login.scss']
})

export class Login implements OnInit { 
  
  isDetailedForm = false; 
  voteNumber = '';
  voterName = '';
  voterFirstName = '';
  voterBirthDate = '';
  voterFatherName = '';
  voterMotherName = '';

  errorMessage: string | null = null;
  isLoading = false;
  showPasswordSetupModal = false;
  verifiedUser: User | null = null; 

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      // Si l'utilisateur est déjà connecté ET a son mot de passe 2FA, on le redirige immédiatement.
      if (user && user.isTwoFactorSetup) {
        this.router.navigate(['/vote']); 
      }
    });
  }
  
  toggleForm(useDetailed: boolean) {
    this.isDetailedForm = useDetailed;
    this.errorMessage = null;
  }

  // Fonction de connexion unifiée
  authenticate() {
    this.errorMessage = null;
    this.isLoading = true;
    
    let authenticationData: any; // Objet qui sera envoyé à authService.authenticate()

    if (!this.isDetailedForm) {
      // Logique pour le formulaire simple (Nom et Numéro de Vote)
      if (!this.voterName || !this.voteNumber) {
        this.errorMessage = 'Veuillez saisir votre Nom et Numéro de Vote.';
        this.isLoading = false;
        return;
      }
      authenticationData = {
        name: this.voterName,
        voteNumber: this.voteNumber 
      };
      
    } else {
      // Logique pour le formulaire détaillé (Infos Personnelles)
      if (!this.voterName || !this.voterFirstName || !this.voterBirthDate) {
        this.errorMessage = 'Veuillez remplir au moins le Nom, Prénom et Date de Naissance.';
        this.isLoading = false;
        return;
      }
      authenticationData = {
        name: this.voterName,
        firstName: this.voterFirstName,
        birthDate: this.voterBirthDate,
        fatherName: this.voterFatherName,
        motherName: this.voterMotherName
      };
    }
    
    
    this.authService.authenticate(authenticationData).subscribe({
      next: (user) => {
        this.isLoading = false;
        if (user) {
          this.verifiedUser = user;
          
          if (user.isTwoFactorSetup) {
            // Utilisateur déjà configuré -> Le rediriger pour voter
            this.router.navigate(['/vote']); 
          } else {
            // Première connexion -> Afficher le popup de configuration du mot de passe
            this.showPasswordSetupModal = true;
          }
        } else {
          this.errorMessage = 'Identifiants non valides.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur de connexion au serveur.';
        console.error(err);
      }
    });
  }

  // Gérer la fermeture du popup (après configuration réussie ou annulation)
  onPasswordSetupDone(success: boolean) {
    this.showPasswordSetupModal = false;
    if (success) {
      // Rediriger vers le vote après le setup
      this.router.navigate(['/vote']);
    } else {
      // En cas d'annulation ou d'échec, déconnecter l'utilisateur (le ramener à l'état initial)
      this.authService.logout();
    }
  }
}