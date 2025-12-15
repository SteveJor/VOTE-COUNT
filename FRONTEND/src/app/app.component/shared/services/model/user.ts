export interface User {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  region: string;
  numeroCNI: string;
  photo: string;
  dateInscription: string;
  email: string;
  avote: boolean;

  // Champs front (logique existante)
  isTwoFactorSetup?: boolean;
}
