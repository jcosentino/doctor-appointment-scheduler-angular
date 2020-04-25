import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoggedInGuard } from './guards/user-logged-in/user-logged-in.guard';
import { AuthService } from './services/auth.service';
import { LandingPagesComponent, HomeComponent } from './components';
import { LoginComponent,
         RegisterComponent,
         ForgottenPasswordComponent } from './components/landing-pages/components';
import { AppointmentComponent, AdminPageComponent } from './components/home/components';
import { UserIsAdminGuard } from './guards/user-isadmin/user-isadmin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserLoggedInGuard],
    children: [
      {
        path: 'admin',
        component: AdminPageComponent,
        canActivate: [UserIsAdminGuard]
      },
      {
        path: 'appointments',
        component: AppointmentComponent
      },
      {
        path: '**',
        redirectTo: 'admin'
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
  providers: [
    UserLoggedInGuard,
    UserIsAdminGuard,
    AuthService
  ]
})
export class AppRoutingModule { }
