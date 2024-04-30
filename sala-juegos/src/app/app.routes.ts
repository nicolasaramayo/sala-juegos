import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { PagenotfoundComponent } from './componentes/pagenotfound/pagenotfound.component';
import { AboutmeComponent } from './componentes/aboutme/aboutme.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'aboutme', component: AboutmeComponent },
    { path: '**', component: PagenotfoundComponent },
  ];

