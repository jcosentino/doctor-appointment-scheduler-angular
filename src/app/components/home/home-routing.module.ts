import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoggedInGuard } from 'src/app/guards/user-logged-in/user-logged-in.guard';
import { AppointmentComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    canActivate: [UserLoggedInGuard]
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
export class HomeRoutingModule { }
