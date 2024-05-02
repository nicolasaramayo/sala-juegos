import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userMail: string = "";
  userPWD: string = "";

  loggedUser: string | null = "";


  constructor(public auth: Auth, private router: Router, private Firestore: Firestore) {
    
  }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((res) => {
          this.loggedUser =res.user?.email;
          console.log(this.loggedUser);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  logout() {
    signOut(this.auth).then(() => {
      console.log(this.auth.currentUser?.email)
    })
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  redirectToHome() {
    this.router.navigate(['home']);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  redirectToRegister() {
    this.router.navigate(['register']);
  }
}