import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: any;

  constructor(private auth: Auth, private router: Router) {
    
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then((res) => {
      //if (res.user.email !== null) this.loggedUser = res.user.email;
    }).catch((e) => console.log(e))
  }

  logout() {
    return signOut;
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getCurrentUser() {
    return this.user;
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(
      switchMap(user => {
        if (user) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}