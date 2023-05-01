import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from './model/Evenement';

@Injectable({
  providedIn: 'root'
})

//Mise en place de la liaison avec la partie Node
export class ApiProjetWebService {
  private url = 'http://localhost:3000' ; 

  constructor(private httpClient: HttpClient) {}
  
  //recuperation des infos de l'API
  public recupereListeEvenements(): Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(this.url + '/') ;
  }


}
