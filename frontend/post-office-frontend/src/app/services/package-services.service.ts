import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PackageServicesService {


  constructor(private http: HttpClient, private router: Router) { }

  addEntry(entry: any)
  {
   
    var res: any;
   
    this.http.post<any>('http://localhost:3000/package', entry, {observe: 'response',}).subscribe(data => {

      if(data.status == 201)
      {
        this.router.navigate(['/success']);
      }
      
  })


  }
}