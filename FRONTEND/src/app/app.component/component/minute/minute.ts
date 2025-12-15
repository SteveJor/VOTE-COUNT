import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-minute',
  imports: [
    CommonModule,
  ],
  templateUrl: './minute.html',
  styleUrl: './minute.scss',
})
export class Minute implements OnInit, OnDestroy {

  
  
  @Input() endDateString: string = ''; 
  
  
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  
  isElectionLive: boolean = true;
  private timerSubscription: Subscription | undefined;

  ngOnInit(): void {
    if (!this.endDateString) {
      console.error("endDateString est requis pour le minuteur.");
      this.isElectionLive = false;
      return;
    }
    
    
    this.timerSubscription = interval(1000).subscribe(() => {
      this.calculateTimeRemaining();
    });
  }

  calculateTimeRemaining() {
    const now = new Date().getTime();
    const endDate = new Date(this.endDateString).getTime();
    const distance = endDate - now;

    if (distance < 0) {
      
      this.days = this.hours = this.minutes = this.seconds = 0;
      this.isElectionLive = false;
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      return;
    }

    
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }
  
 
  formatNumber(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  ngOnDestroy(): void {
   
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

}
