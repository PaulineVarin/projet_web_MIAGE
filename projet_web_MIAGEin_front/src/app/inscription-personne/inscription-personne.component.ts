import { Component, OnInit } from '@angular/core';
import { ApiProjetWebService } from '../api-projet-web.service';
import { Participant } from '../model/Participant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscription-personne',
  templateUrl: './inscription-personne.component.html',
  styleUrls: ['./inscription-personne.component.css']
})
export class InscriptionPersonneComponent implements OnInit {
  //mise en place des elements pour la page
  acronymeEvent:String = '' ; 


  //mise en place de la recuperation des informations a envoyer a l'API
  participant:Participant = new Participant() ; 

  constructor(private apiProjetWeb:ApiProjetWebService,
              private routeActive: ActivatedRoute) {}


  ngOnInit(): void {
    this.acronymeEvent = this.routeActive.snapshot.params['acronyme'] ; 
  }

  rajoutParticipant():void {
    this.acronymeEvent = "Bouton marche" ; 
    //this.apiProjetWeb.ajouterParticipant(this.participant) ; 
  }



}
