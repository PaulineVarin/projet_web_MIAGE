import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Evenement } from './model/Evenement';
import { Participant } from './model/Participant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiProjetWebService {
  myData: BehaviorSubject<Participant> = new BehaviorSubject<Participant>(new Participant());
  
  //Mise en place de la liaison avec la partie Node
  private url = 'http://localhost:3000' ; 


  constructor(private httpClient: HttpClient) {}
  
  //recuperation des infos de l'API pour les evenements

  //Recuperation de tout les evenements
  public recupererListeEvenements(): Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(this.url + '/evenement/lister') ;
  }

  //Recuperation des evenements
  public recupererListeEvenementsCourants():Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(this.url + '/evenement/lister/actifs') ; 
  }

  //Recuperation des informations pour un evenement
  public recupererInformationsEvenement(acronyme:string):Observable<Evenement> {
    return this.httpClient.get<Evenement>(this.url+'/evenement/details/'+acronyme) ; 
  }

  public recupererNbEvenements():Observable<number> {
    return this.httpClient.get<number>(this.url+'/evenement/lister/all') ; 
  }

  //Envoi et recuperation des infos de l'API pour l'ajout d'un participant a un evenement
  public ajouterParticipant(pacronyme:String, pparticipant:Participant) {
    console.log("HELLO SERVICE WEB") ; 
    //Retourne un JSON qui contient le detail des etapes ou une erreur qui est gérée dans la souscription du component
    return this.httpClient.post<JSON>(this.url+'/personne/ajouter', [pacronyme, pparticipant])
  }





}
