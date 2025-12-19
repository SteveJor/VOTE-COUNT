import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartiService } from '../../shared/services/parti.service';
import { interfaceParti } from '../../shared/services/model/parti';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './candidate.html',
  styleUrls: ['./candidate.scss'],
})
export class Candidate implements AfterViewInit {
  allCandidates: interfaceParti[] = [];
  displayedCandidates: interfaceParti[] = [];
  candidatesToShow: number = 8;
  hasMoreCandidates: boolean = false;
  isLoading: boolean = true;

  // Couleurs pour les cartes
  private colors: string[] = ['red', 'green', 'olive', 'blue', 'black', 'brown', 'purple'];

  constructor(private partiService: PartiService, private cd: ChangeDetectorRef) {}

  async ngAfterViewInit(): Promise<void> {
    this.isLoading = true;
    try {
      const partis = await this.partiService.getAllPartis();
      this.allCandidates = partis.map((parti, index) => ({
        ...parti,
        color: this.colors[index % this.colors.length],
        votesPercent: parti.nombreDeVoix,
        rank: `${index + 1}${this.getOrdinalSuffix(index + 1)}`
      }));
      this.updateDisplayedCandidates();
    } catch (error) {
      console.error('Erreur lors du chargement des partis', error);
      this.allCandidates = [];
    } finally {
      this.isLoading = false;
      this.cd.detectChanges(); // 🔹 force la détection après chargement
    }
  }

  private getOrdinalSuffix(i: number): string {
    const j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return 'er';
    return 'ème';
  }

  updateDisplayedCandidates(): void {
    this.displayedCandidates = this.allCandidates.slice(0, this.candidatesToShow);
    this.hasMoreCandidates = this.allCandidates.length > this.candidatesToShow;
  }

  showMore(): void {
    this.candidatesToShow += 3;
    this.updateDisplayedCandidates();
  }
}
