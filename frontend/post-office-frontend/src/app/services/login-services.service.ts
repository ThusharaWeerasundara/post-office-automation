import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  loged$: boolean;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) 
  { 
    this.loged$ = false;
  }

  login(user: any)
  {
    console.log("login " + user.email + " " + user.password)
    const url = "http://localhost:3000/testget"
    var res: any;
    var cookiename: string;

    this.http.post<any>('http://localhost:3000/login', user, {observe: 'response',}).subscribe(data => {
      //console.log("res status" + JSON.stringify(data)) 
     // console.log("res status" + data.status)
      if(data.status == 200)
      {
        this.loged$ = true;
        this.router.navigate(['/records']);
        cookiename = this.cookieService.get('jwt')
       // console.log("res jwt" + JSON.stringify(data.headers))

      }
      
  })
  }

  logout()
  {
    this.loged$ = false;
    this.router.navigate(['/login']);
  }
}
