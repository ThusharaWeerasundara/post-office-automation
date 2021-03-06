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
import { PackageServicesService } from './services/package-services.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { SuccessComponent } from './success/success.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.hivemq.com',
  port: 8000,
  path: '/mqtt'
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecordsComponent,
    HomeComponent,
    BsNavbarComponent,
    AddPackageComponent,
    SuccessComponent,
    SpinnerComponent
  ],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'records', component: RecordsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'sendpackage', component: AddPackageComponent},
      {path: 'success', component: SuccessComponent}
      
    ]),
    HttpClientModule,
    
  ],
  providers: [LoginServicesService, PackageServicesService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
