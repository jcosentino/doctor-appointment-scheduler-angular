import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoggedInGuard } from './guards/user-logged-in/user-logged-in.guard';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserLoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [!UserLoggedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [!UserLoggedInGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserLoggedInGuard]
})
export class AppRoutingModule { }
