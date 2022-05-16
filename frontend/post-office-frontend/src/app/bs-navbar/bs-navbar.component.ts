import { Component, OnInit } from '@angular/core';
import { LoginServicesService } from '../services/login-services.service';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  

  constructor(public auth: LoginServicesService) 
  { 
     // 
  }

  ngOnInit(): void {
}
  logout()
  {
    this.auth.logout();
    console.log("logout: " + this.auth.loged$)
  }

}
