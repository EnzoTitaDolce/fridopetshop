import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccesoriosserviceService {

  private jsonurl = 'assets/accesoriosjson.json'

  constructor(private http:HttpClient) {}

  getData():Observable<any>{
    return this.http.get<any>(this.jsonurl).pipe(map((response)=>{
      return response
    }))
  }

}
