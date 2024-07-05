// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  //private jsonUrl = 'alimentosjson.json'
  //private jsonUrl = '../../assets/alimentosjson.json';
  private jsonUrl = 'assets/alimentosjson.json';
  //private jsonUrl = 'https://proyectoclapcu.web.app/alimentosjson.json'

  constructor(private http: HttpClient) { }


  getData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(map((response) => {
        return response; // Puedes desanidar aquí si es necesario
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

