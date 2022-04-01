import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  constructor(private http: HttpClient) { }

  login(user: any)
  {
    console.log("login " + user.email + " " + user.password)
    const url = "http://localhost:3000/testget"
    var res: any;
    /*
    this.http.get<any>(url).subscribe(data => {
      res = data.total;
      console.log("res " + data.message)     
    })     
    */

    this.http.post<any>('http://localhost:3000/login', user).subscribe(data => {
      console.log("res " + data.headers) 
  })


  }
}
