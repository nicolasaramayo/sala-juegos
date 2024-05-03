import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userMail: string = "";
  userPWD: string = "";

  loggedUser: string | any= "";


  constructor(public auth: Auth, private router: Router, private firestore: Firestore) {
    
  }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((res) => {
          this.loggedUser =res.user?.email;
          localStorage.setItem('loggedUser', this.loggedUser); 

          let col = collection(this.firestore, 'logins');
          addDoc(col, { fecha: new Date(), "user": res.user?.email})

          console.log(this.loggedUser);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  logout() {
  const userEmail = localStorage.getItem('loggedUser'); 

  signOut(this.auth)
    .then(() => {
      console.log("Usuario deslogueado:", userEmail); 
      
      let col = collection(this.firestore, 'logouts');
      addDoc(col, { fecha: new Date(), "user": userEmail }); 

      localStorage.removeItem('loggedUser'); 
  })
  .catch((error) => {
    console.error("Error al desloguear:", error); 
  });
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