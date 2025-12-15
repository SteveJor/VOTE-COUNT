import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { User } from './model/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.currentUser$.pipe(map(user => !!user)); // ✅ Observable réactif

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser));
      } catch (e) {
        console.error('Erreur lors du parsing du user stocké', e);
        localStorage.removeItem('currentUser');
      }
    }
  }

  async authenticate(numeroCNI: string, name: string): Promise<User> {
    const url = `${this.apiUrl}/login?numeroCNI=${encodeURIComponent(numeroCNI)}&name=${encodeURIComponent(name)}`;
    try {
      const user = await firstValueFrom(this.http.post<User>(url, { numeroCNI, name }));

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;

    } catch (error: any) {
      console.error('Erreur d\'authentification:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
