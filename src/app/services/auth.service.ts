import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor( ) { }
  login(email: string, password: string): boolean {debugger
    this.isLoggedIn = email === 'user@user.com' && password === '8ed46d8';
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
 
  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }
  
}
