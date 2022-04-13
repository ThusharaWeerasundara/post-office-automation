import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginServicesService } from './services/login-services.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecordsComponent,
    HomeComponent,
    BsNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'records', component: RecordsComponent},
      {path: 'login', component: LoginComponent}

    ]),
    HttpClientModule
  ],
  providers: [LoginServicesService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
