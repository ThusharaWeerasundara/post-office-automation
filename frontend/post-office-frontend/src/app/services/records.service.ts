import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private results!: any;
  private url = "http://localhost:3000/packages";
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any>
  {
    
    return this.http.get(this.url)
    .pipe(
      catchError(this.handleError)
    );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error.message)

    } else {
      console.log(error.status)
    }
    return throwError(
      console.log('Something is wrong!'));
  };

}
