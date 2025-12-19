// vote-page.component.ts
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VoteService } from '../services/vote.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/model/user';
import { map, Observable } from 'rxjs';
import { PartiService } from '../services/parti.service';
import { interfaceParti } from '../services/model/parti';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vote-page.html',
  styleUrls: ['./vote-page.scss'],
  animations: [
    trigger('gridAnimation', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            transform: 'scale(0.9) translateY(30px)'
          }),
          stagger(80, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({
                opacity: 1,
                transform: 'scale(1) translateY(0)'
              })
            )
          ])
        ], { optional: true }),

        query(':leave', [
          stagger(50, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({
                opacity: 0,
                transform: 'scale(0.9) translateY(-30px)'
              })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class VotePage implements AfterViewInit {
  selectedId: number | null = null;
  selectedCandidate: interfaceParti | null = null;
  showConfirm = false;
  candidateToVote = '';
  votePassword = '';
  errorMessage: string | null = null;
  allCandidates: interfaceParti[] = [];

  isLoading: boolean = true;

  private colors: string[] = ['red', 'green', 'olive', 'blue', 'black', 'brown', 'purple'];

  hasVoted$: Observable<boolean>;

  constructor(
    private partiService: PartiService,
    public voteService: VoteService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.hasVoted$ = this.voteService.hasVoted$;
  }

  ngAfterViewInit(): void {
    this.isLoading = true;

    this.authService.currentUser$.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    ).subscribe();

    this.loadCandidates();
  }

  private async loadCandidates(): Promise<void> {
    try {
      const partis = await this.partiService.getAllPartis();

      this.allCandidates = partis.map((candidate, index) => ({
        ...candidate,
        color: this.colors[index % this.colors.length],
        description: candidate.slogan || `Candidat du parti ${candidate.nomParti}`
      }));

    } catch (error) {
      console.error('Erreur lors du chargement des candidats', error);
      this.allCandidates = [];
    } finally {
      this.isLoading = false;
      this.cd.detectChanges();
    }
  }

  // ⭐ TrackBy pour optimiser les animations
  trackByPartiId(index: number, parti: interfaceParti): any {
    return parti.id ?? parti.nomParti;
  }

  selectCandidate(candidate: interfaceParti) {
    this.selectedId = candidate.id;
    this.selectedCandidate = candidate;
    this.candidateToVote = `${candidate.president} - ${candidate.nomParti}`;
    this.errorMessage = null;
  }

  confirm(candidate: interfaceParti, event: Event) {
    event.stopPropagation();
    this.selectCandidate(candidate);
    this.votePassword = '';
    this.errorMessage = null;
    this.showConfirm = true;
  }

  showMore(candidate: interfaceParti, event: Event) {
    event.stopPropagation();
    alert(`Détails sur ${candidate.president}:\nParti: ${candidate.nomParti}\nSlogan: ${candidate.slogan}`);
  }

  cancelVote() {
    this.showConfirm = false;
    this.votePassword = '';
    this.errorMessage = null;
  }

  finalizeVote() {
    if (!this.selectedCandidate || !this.votePassword) {
      this.errorMessage = 'Veuillez entrer votre mot de passe de vote.';
      return;
    }

    const user: User | null = this.voteService.currentVoter || this.authService.getCurrentUser();

    if (!user) {
      this.errorMessage = "Erreur: Utilisateur non connecté.";
      return;
    }

    this.authService.verifyTwoFactorPassword(user, this.votePassword).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.voteService.vote(this.selectedCandidate!.id.toString()).subscribe({
            next: (success) => {
              if (success) {
                this.showConfirm = false;
                this.votePassword = '';
                this.router.navigate(['/thank-you']);
              } else {
                this.errorMessage = "Une erreur est survenue ou vous avez déjà voté.";
              }
            },
            error: (err) => {
              console.error('Erreur lors du vote:', err);
              this.errorMessage = "Une erreur est survenue lors de l'enregistrement du vote.";
            }
          });
        } else {
          this.errorMessage = "Mot de passe de vote invalide.";
          this.votePassword = '';
        }
      },
      error: (err) => {
        console.error('Erreur de vérification:', err);
        this.errorMessage = "Erreur de vérification du mot de passe. Veuillez réessayer.";
        this.votePassword = '';
      }
    });
  }

  logout() {
    this.voteService.reset();
    this.router.navigate(['/']);
  }
}
