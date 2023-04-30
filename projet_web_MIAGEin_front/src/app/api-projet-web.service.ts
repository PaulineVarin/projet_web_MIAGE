import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from './model/Evenement';

@Injectable({
  providedIn: 'root'
})
export class ApiProjetWebService {
  private url = 'http://localhost:3000' ; 

  constructor(private httpClient: HttpClient) {}

  public recupereListeEvenement(): Observable<Evenement[]> {
    console.log(this.url);
    return this.httpClient.get<Evenement[]>(this.url + '/') ;
  }


}
