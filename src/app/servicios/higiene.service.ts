import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HigieneService {

  private jsonurl = 'assets/saludjson.json'

  constructor(private http: HttpClient) {
   }

   getData(): Observable<any>{

    return this.http.get<any>(this.jsonurl).pipe(map((respone)=>{
      return respone
    }))

   }
}
