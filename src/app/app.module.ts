import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, LandingPagesComponent } from './components';
import { StorageServiceModule } from 'angular-webstorage-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiUrlInterceptor } from './http-intercept/http-interceptor';
import { HomeModule, LandingPagesModule } from './components';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingPagesComponent
  ],
  imports: [
    StorageServiceModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    LandingPagesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
