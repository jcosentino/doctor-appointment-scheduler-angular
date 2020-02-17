import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserLoggedInGuard } from './guards/user-logged-in/user-logged-in.guard';
import { LoginComponent } from './components';
import { RegisterComponent } from './components';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserLoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserLoggedInGuard, AuthService]
})
export class AppRoutingModule { }
