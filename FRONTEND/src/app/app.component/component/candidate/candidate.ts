import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { interfaceCandidat } from '../../shared/interfaces/interfaceCandidat'; 

@Component({
  selector: 'app-candidate', 
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  templateUrl: './candidate.html', 
  styleUrls: ['./candidate.scss'], 
})

export class Candidate implements OnInit {


  allCandidates: interfaceCandidat[] = [ 
    { id: 1, name: 'NOM DU CANDIDAT A', party: 'PARTI POLITIQUE', votesPercent: 75, color: 'red', rank: '1er' },
    { id: 2, name: 'NOM DU CANDIDAT B', party: 'PARTI POLITIQUE', votesPercent: 68, color: 'green', rank: '2ème' },
    { id: 3, name: 'NOM DU CANDIDAT C', party: 'PARTI POLITIQUE', votesPercent: 55, color: 'olive', rank: '3ème' },
    { id: 4, name: 'NOM DU CANDIDAT D', party: 'PARTI POLITIQUE', votesPercent: 42, color: 'blue', rank: '4ème' },
    { id: 5, name: 'NOM DU CANDIDAT E', party: 'PARTI POLITIQUE', votesPercent: 30, color: 'black', rank: '5ème' },
    { id: 6, name: 'NOM DU CANDIDAT F', party: 'PARTI POLITIQUE', votesPercent: 18, color: 'brown', rank: '6ème' },
    { id: 7, name: 'NOM DU CANDIDAT G', party: 'PARTI POLITIQUE', votesPercent: 5, color: 'purple', rank: '7ème' },
  ];

  
  candidatesToShow: number = 6;
  
  
  displayedCandidates: interfaceCandidat[] = [];

  
  hasMoreCandidates: boolean = false;

  ngOnInit(): void {
    this.updateDisplayedCandidates();
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