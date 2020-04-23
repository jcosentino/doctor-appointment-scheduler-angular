import { NgModule } from '@angular/core';
import { ForgottenPasswordComponent,
         LoginComponent,
         RegisterComponent } from './components';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    ForgottenPasswordComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class LandingPagesModule { }
