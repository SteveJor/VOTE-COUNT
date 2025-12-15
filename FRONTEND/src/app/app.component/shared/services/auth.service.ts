import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

// Interface pour définir la structure d'un utilisateur (Électeur)
export interface User {
  name: string;
  firstName: string;
  birthDate: string;
  fatherName?: string;
  motherName?: string;
  voteNumber: string;
  username: string; // Nom affiché à l'utilisateur
  isTwoFactorSetup: boolean; // Indique si le mot de passe 2FA est configuré
  twoFactorPasswordHash?: string; // Stockage simulé du mot de passe (hashé dans un vrai système)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Base de données simulée des électeurs
  private mockUsers: User[] = [
    { 
      name: 'DUPONT', 
      firstName: 'JEAN', 
      birthDate: '1985-06-15', 
      voteNumber: 'VOTE123', 
      username: 'Jean Dupont', 
      isTwoFactorSetup: false 
    },
    { 
      name: 'DURAND', 
      firstName: 'MARIE', 
      birthDate: '1990-11-20', 
      voteNumber: 'VOTE456', 
      username: 'Marie Durand', 
      isTwoFactorSetup: true,
      twoFactorPasswordHash: '123456' // Mot de passe configuré
    },
    // Ajoutez d'autres utilisateurs pour tester les deux cas (configuré/non configuré)
  ];
  
  // Sujet pour suivre l'état de l'utilisateur connecté
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  constructor() {
    // Au démarrage, tente de restaurer l'état de l'utilisateur (utile pour l'état de la Navbar)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  /**
   * Tente d'authentifier un utilisateur en utilisant soit le numéro de vote, 
   * soit les informations personnelles détaillées.
   * @param data Les données d'identification de l'utilisateur.
   * @returns Observable de l'utilisateur vérifié ou null.
   */
  authenticate(data: {
    name: string;
    voteNumber?: string;
    firstName?: string;
    birthDate?: string;
    fatherName?: string;
    motherName?: string;
  }): Observable<User | null> {
    
    // Normaliser les noms pour la recherche
    const name = data.name.toUpperCase();
    
    let foundUser: User | undefined;
    
    if (data.voteNumber) {
      // 1. Authentification par Numéro de Vote
      foundUser = this.mockUsers.find(u => 
        u.name === name && u.voteNumber === data.voteNumber
      );
      
    } else if (data.firstName && data.birthDate) {
      // 2. Authentification par Infos Personnelles
      const firstName = data.firstName.toUpperCase();
      const birthDate = data.birthDate; // Date au format YYYY-MM-DD
      
      foundUser = this.mockUsers.find(u => 
        u.name === name && 
        u.firstName === firstName && 
        u.birthDate === birthDate
        // On pourrait ajouter ici la vérification des noms des parents (fatherName, motherName)
      );
    }
    
    // Simuler un délai réseau
    if (foundUser) {
      return of(foundUser).pipe(delay(500), tap(user => {
        // Stocker l'utilisateur (sans le mot de passe pour la sécurité)
        const userToStore = { ...user };
        delete userToStore.twoFactorPasswordHash;
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        this.currentUserSubject.next(user);
      }));
    } else {
      return of(null).pipe(delay(500));
    }
  }
  
  /**
   * Termine la configuration du mot de passe 2FA lors de la première connexion.
   */
  completeTwoFactorSetup(user: User, password: string): Observable<boolean> {
    
    // Simuler le hachage et la mise à jour de l'utilisateur en DB
    const userIndex = this.mockUsers.findIndex(u => u.voteNumber === user.voteNumber);
    
    if (userIndex !== -1) {
      // Dans un vrai système, on hacherait le mot de passe
      this.mockUsers[userIndex].twoFactorPasswordHash = password; 
      this.mockUsers[userIndex].isTwoFactorSetup = true;
      
      // Mettre à jour l'utilisateur dans le BehaviorSubject et le localStorage
      const updatedUser = this.mockUsers[userIndex];
      const userToStore = { ...updatedUser };
      delete userToStore.twoFactorPasswordHash;

      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      this.currentUserSubject.next(updatedUser);
      
      return of(true).pipe(delay(500));
    }
    
    return of(false).pipe(delay(500));
  }
  
  /**
   * Vérifie le mot de passe 2FA lors des connexions ultérieures.
   */
  verifyTwoFactorPassword(user: User, password: string): Observable<boolean> {
      
      // Trouver l'utilisateur dans notre base de données mockée (qui contient le mot de passe)
      const mockUser = this.mockUsers.find(u => u.voteNumber === user.voteNumber);
      
      if (mockUser && mockUser.isTwoFactorSetup && mockUser.twoFactorPasswordHash === password) {
          // Simulation réussie
          return of(true).pipe(delay(500));
      }
      
      return of(false).pipe(delay(500));
  }
  

  /**
   * Déconnecte l'utilisateur.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  /**
   * Accès à l'état de connexion (pour le Navbar/Bouton Flottant)
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.currentUser$.pipe(
      // On considère que l'utilisateur est "connecté" s'il a vérifié son identité ET configuré son mot de passe
      // Sinon, on pourrait considérer qu'il est connecté dès qu'il a un objet User.
      // Pour le moment, nous allons utiliser l'existence de l'objet User.
      // Le bouton flottant utilise juste la présence du User.
      // La page de vote utilisera isTwoFactorSetup.
      map(user => !!user)
    );
  }
}