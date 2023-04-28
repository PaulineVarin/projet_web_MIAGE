import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiProjetWebService {
  private url = 'http://localhost:3000' ; 

  constructor(private httpClient: HttpClient) { }
}
