import { Component } from '@angular/core';
import { RegionData } from '../../shared/interfaces/regional-data-interface';
import { interfaceCandidat } from '../../shared/interfaces/interfaceCandidat';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regional-rang',
  imports: [
    CommonModule,
  ],
  templateUrl: './regional-rang.html',
  styleUrls: ['./regional-rang.scss'],
})
export class RegionalRang {

  allRegionsData: RegionData[] = [
    // --- Région 1 (LITTORAL) ---
    { id: 1, name: 'LITTORAL', totalVoters: 10000, candidates: [
      { id: 1, name: 'Cand. A', party: 'Partie politique', votesPercent: 50, color: 'red', rank: '1er' },
      { id: 2, name: 'Cand. B', party: 'Partie politique', votesPercent: 30, color: 'green', rank: '2ème' },
      { id: 3, name: 'Cand. C', party: 'Partie politique', votesPercent: 10, color: 'blue', rank: '3ème' },
      { id: 4, name: 'Cand. D', party: 'Partie politique', votesPercent: 5, color: 'olive', rank: '4ème' },
      { id: 5, name: 'Cand. E', party: 'Partie politique', votesPercent: 2, color: 'black', rank: '5ème' },
      // Candidats cachés par défaut
      { id: 6, name: 'Cand. F', party: 'Partie politique', votesPercent: 1, color: 'brown', rank: '6ème' },
      { id: 7, name: 'Cand. G', party: 'Partie politique', votesPercent: 1, color: 'purple', rank: '7ème' },
    ]},
    // --- Région 2 (CENTRE) ---
    { id: 2, name: 'CENTRE', totalVoters: 8500, candidates: [
      { id: 1, name: 'Cand. A', party: 'Partie politique', votesPercent: 50, color: 'red', rank: '1er' },
      { id: 2, name: 'Cand. B', party: 'Partie politique', votesPercent: 30, color: 'green', rank: '2ème' },
      { id: 3, name: 'Cand. C', party: 'Partie politique', votesPercent: 10, color: 'blue', rank: '3ème' },
      { id: 4, name: 'Cand. D', party: 'Partie politique', votesPercent: 5, color: 'olive', rank: '4ème' },
      { id: 5, name: 'Cand. E', party: 'Partie politique', votesPercent: 2, color: 'black', rank: '5ème' },
      // Candidats cachés par défaut
      { id: 6, name: 'Cand. F', party: 'Partie politique', votesPercent: 1, color: 'brown', rank: '6ème' },
      { id: 7, name: 'Cand. G', party: 'Partie politique', votesPercent: 1, color: 'purple', rank: '7ème' },
    ]},
    // --- Région 3 (EST) ---
    { id: 3, name: 'EST', totalVoters: 5200, candidates: [
      { id: 1, name: 'Cand. A', party: 'Partie politique', votesPercent: 50, color: 'red', rank: '1er' },
      { id: 2, name: 'Cand. B', party: 'Partie politique', votesPercent: 30, color: 'green', rank: '2ème' },
      { id: 3, name: 'Cand. C', party: 'Partie politique', votesPercent: 10, color: 'blue', rank: '3ème' },
      { id: 4, name: 'Cand. D', party: 'Partie politique', votesPercent: 5, color: 'olive', rank: '4ème' },
      { id: 5, name: 'Cand. E', party: 'Partie politique', votesPercent: 2, color: 'black', rank: '5ème' },
      // Candidats cachés par défaut
      { id: 6, name: 'Cand. F', party: 'Partie politique', votesPercent: 1, color: 'brown', rank: '6ème' },
      { id: 7, name: 'Cand. G', party: 'Partie politique', votesPercent: 1, color: 'purple', rank: '7ème' },
    ]},
    // --- Région 4 (SUD - Cachée par défaut) ---
    { id: 4, name: 'SUD', totalVoters: 4000, candidates: [
      { id: 1, name: 'Cand. A', party: 'Partie politique', votesPercent: 50, color: 'red', rank: '1er' },
      { id: 2, name: 'Cand. B', party: 'Partie politique', votesPercent: 30, color: 'green', rank: '2ème' },
      { id: 3, name: 'Cand. C', party: 'Partie politique', votesPercent: 10, color: 'blue', rank: '3ème' },
      { id: 4, name: 'Cand. D', party: 'Partie politique', votesPercent: 5, color: 'olive', rank: '4ème' },
      { id: 5, name: 'Cand. E', party: 'Partie politique', votesPercent: 2, color: 'black', rank: '5ème' },
      // Candidats cachés par défaut
      { id: 6, name: 'Cand. F', party: 'Partie politique', votesPercent: 1, color: 'brown', rank: '6ème' },
      { id: 7, name: 'Cand. G', party: 'Partie politique', votesPercent: 1, color: 'purple', rank: '7ème' },
    ]},
    // --- Région 4 (SUD - Cachée par défaut) ---
    { id: 5, name: 'SUD-OUEST', totalVoters: 4000, candidates: [
      { id: 1, name: 'Cand. A', party: 'Partie politique', votesPercent: 50, color: 'red', rank: '1er' },
      { id: 2, name: 'Cand. B', party: 'Partie politique', votesPercent: 30, color: 'green', rank: '2ème' },
      { id: 3, name: 'Cand. C', party: 'Partie politique', votesPercent: 10, color: 'blue', rank: '3ème' },
      { id: 4, name: 'Cand. D', party: 'Partie politique', votesPercent: 5, color: 'olive', rank: '4ème' },
      { id: 5, name: 'Cand. E', party: 'Partie politique', votesPercent: 2, color: 'black', rank: '5ème' },
      // Candidats cachés par défaut
      { id: 6, name: 'Cand. F', party: 'Partie politique', votesPercent: 1, color: 'brown', rank: '6ème' },
      { id: 7, name: 'Cand. G', party: 'Partie politique', votesPercent: 1, color: 'purple', rank: '7ème' },
    ]},
    // --- Région 4 (SUD - Cachée par défaut) ---
    { id: 4, name: 'NORD', totalVoters: 4000, candidates: [
      { id: 1, name: 'Cand. A', party: 'Partie politique', votesPercent: 50, color: 'red', rank: '1er' },
      { id: 2, name: 'Cand. B', party: 'Partie politique', votesPercent: 30, color: 'green', rank: '2ème' },
      { id: 3, name: 'Cand. C', party: 'Partie politique', votesPercent: 10, color: 'blue', rank: '3ème' },
      { id: 4, name: 'Cand. D', party: 'Partie politique', votesPercent: 5, color: 'olive', rank: '4ème' },
      { id: 5, name: 'Cand. E', party: 'Partie politique', votesPercent: 2, color: 'black', rank: '5ème' },
      // Candidats cachés par défaut
      { id: 6, name: 'Cand. F', party: 'Partie politique', votesPercent: 1, color: 'brown', rank: '6ème' },
      { id: 7, name: 'Cand. G', party: 'Partie politique', votesPercent: 1, color: 'purple', rank: '7ème' },
    ]},

    // ... plus de régions
  ];

  // LOGIQUE DE PAGINATION DES RÉGIONS
  regionsToShow: number = 3; // Nombres de cadres de régions visibles initialement (3 cadres par ligne dans l'image)
  displayedRegions: RegionData[] = [];
  hasMoreRegions: boolean = false;

  // Stocke l'état de pagination des candidats pour chaque région
  candidatePaginationState: { [regionId: number]: number } = {};
  
  // Constantes
  CANDIDATES_PER_PAGE: number = 5; // Nombre de candidats affichés par défaut (selon l'image)
  CANDIDATES_LOAD_BLOCK: number = 5; // Nombre de candidats ajoutés par "Voir Plus"

  ngOnInit(): void {
    this.initializePagination();
    this.updateDisplayedRegions();
  }

  initializePagination(): void {
    // Initialise l'état pour toutes les régions à 5 candidats affichés par défaut
    this.allRegionsData.forEach(region => {
      this.candidatePaginationState[region.id] = this.CANDIDATES_PER_PAGE;
    });
  }

  // --- Fonctions de Pagination des RÉGIONS ---
  updateDisplayedRegions(): void {
    this.displayedRegions = this.allRegionsData.slice(0, this.regionsToShow);
    this.hasMoreRegions = this.allRegionsData.length > this.regionsToShow;
  }

  showMoreRegions(): void {
    this.regionsToShow += 3; // Ajout d'une ligne de 3 régions
    this.updateDisplayedRegions();
  }

  // --- Fonctions de Pagination des CANDIDATS (dans une Région) ---
  getCandidatesToShow(region: RegionData): interfaceCandidat[] {
    const limit = this.candidatePaginationState[region.id];
    return region.candidates.slice(0, limit);
  }

  showMoreCandidates(regionId: number): void {
    this.candidatePaginationState[regionId] += this.CANDIDATES_LOAD_BLOCK;
  }

  // Vérifie s'il reste des candidats cachés dans la région
  hasMoreCandidates(region: RegionData): boolean {
    const limit = this.candidatePaginationState[region.id];
    return region.candidates.length > limit;
  }
}
