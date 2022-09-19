import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { HttpClientModule, HttpClient } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderDashComponent } from './order-dash/order-dash.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OrderDashComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
   // HttpClient,
    HttpClientModule,
    ReactiveFormsModule,
    OrderModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
