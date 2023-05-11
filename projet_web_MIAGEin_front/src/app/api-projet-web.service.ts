import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Evenement } from './model/Evenement';
import { Participant } from './model/Participant';

@Injectable({
  providedIn: 'root'
})

export class ApiProjetWebService {
  
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

  //Recuperer le nombre d'evenements
  public recupererNbEvenements():Observable<number> {
    return this.httpClient.get<number>(this.url+'/evenement/lister/all') ; 
  }

  //Envoi et recuperation des infos de l'API pour l'ajout d'un participant a un evenement
  public ajouterParticipant(pacronyme:String, pparticipant:Participant) {
    console.log("HELLO ajouterParticipant service") ; 
    //Retourne un JSON qui contient le detail des etapes ou une erreur qui est gérée dans la souscription du component
    return this.httpClient.post<JSON>(this.url+'/personne/ajouter', [pacronyme, pparticipant]);
  }

  //Suppression d'un evenement
  public supprimerEvenement(pacronyme:String) {
    console.log("Hello Suppression evenement")
    return this.httpClient.delete<JSON>(this.url+'/evenement/supprimer/'+pacronyme) ; 
  }


  //recuperation des infos de l'API pour les participants

  //Envoi et recuperation des infos de l'API pour l'ajout d'un participant a un evenement
  public ajouterEvenement(pEvenement:Evenement) {
    console.log("HELLO ajouterEvenement service") ;
    //Retourne un JSON qui contient le detail des etapes ou une erreur qui est gérée dans la souscription du component
    return this.httpClient.post<JSON>(this.url+'/evenement/ajouter', pEvenement);
  }

  //Recuperation de la liste des participants pour un evenement
  public listerParticipants(acronymeE:String):Observable<Participant[]> {
    console.log("HELLO lister personnes service") ;
    //retourne la liste des participants pour un evenement
    return this.httpClient.get<Participant[]>(this.url + '/personne/'+acronymeE+'/lister') ;

  }
}
