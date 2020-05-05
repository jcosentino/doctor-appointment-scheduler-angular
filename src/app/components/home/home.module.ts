import { NgModule } from '@angular/core';
import { AppointmentComponent,
         InsuranceComponent,
         ProfileComponent,
         AdminPageComponent } from './components';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  declarations: [
    AppointmentComponent,
    InsuranceComponent,
    ProfileComponent,
    AdminPageComponent
  ],
  imports: [
    CalendarModule
  ],
  exports: [
    AppointmentComponent,
    InsuranceComponent,
    ProfileComponent,
    AdminPageComponent
  ]
})
export class HomeModule { }
