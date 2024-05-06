import { Component,  OnInit} from '@angular/core';
import { AuthenticationService } from '../../share/authentication.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthenticationService], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

  // method for loggin user
  Login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.authService.redirectToHome();
      })
      .catch((error) => {
        console.error(error); 
      });
  }

  // method for log out session user
  CloseSession() {
      this.authService.logout();
  }
  
}