import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoggedInGuard } from './guards/user-logged-in/user-logged-in.guard';
import { AuthService } from './services/auth.service';
import { LandingPagesComponent, HomeComponent } from './components';
import { LoginComponent,
         RegisterComponent,
         ForgottenPasswordComponent } from './components/landing-pages/components';
import { AppointmentComponent } from './components/home/components';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserLoggedInGuard],
    children: [
      {
        path: 'appointments',
        component: AppointmentComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '',
    component: LandingPagesComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: ForgottenPasswordComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserLoggedInGuard, AuthService]
})
export class AppRoutingModule { }
