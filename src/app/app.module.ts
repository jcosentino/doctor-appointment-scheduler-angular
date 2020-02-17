import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components';
import { RegisterComponent } from './components';
import { HomeComponent } from './components';
import { StorageServiceModule } from 'angular-webstorage-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiUrlInterceptor } from './http-intercept/http-interceptor';
import { HomeModule } from './components';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    StorageServiceModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HomeModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true }, ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
