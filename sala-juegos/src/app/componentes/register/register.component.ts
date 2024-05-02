import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUserMail: string = "";
  newUserPWD: string = "";

  loggedUser: string = "";
  flagError: boolean = false;
  msjError: string = "";

  constructor(public auth: Auth) {
  }
  
  Register() {
    createUserWithEmailAndPassword(this.auth, this.newUserMail, this.newUserPWD).then((res) => {
      if (res.user.email !== null) this.loggedUser = res.user.email;

      this.flagError = false;

    }).catch((e) => {
      this.flagError = true;

      switch (e.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          this.msjError = "Email ya en uso";
          break;
        case "auth/missing-password":
        this.msjError = "Password incompleta";
        break;
        case "auth/missing-email":
        this.msjError = "Email incompleto";
        break;
        default:
          this.msjError = e.code
          break;
      }
    });
  }
}
