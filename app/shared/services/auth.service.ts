import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  /**
   * Login Method
   */
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        alert('Something went wrong!');
        this.router.navigate(['/login']);
      }
    );
  }

  /**
   * To Register the account we need provide
   */
  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        alert('Successfully logged out');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }
}
