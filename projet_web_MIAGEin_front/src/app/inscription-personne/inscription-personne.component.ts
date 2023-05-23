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
  acronymeEvent: String = "";
  participantModel: Participant = new Participant();

  resPost = { "existeParticipant": true, "placesRestantes":true,"liaison": true };
  envoiFomulaire = false;
  erreurFormulaire = false;


  constructor(private apiProjetWeb: ApiProjetWebService,
    private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.acronymeEvent = this.routeActive.snapshot.params['acronyme'];
  }

  rajoutParticipant() {
    this.envoiFomulaire = true;
    this.erreurFormulaire = false;
    //Récupération d'un Observable auquel on se souscrit, on récupère le JSON si valide, sinon on gère l'erreur
    this.apiProjetWeb.ajouterParticipant(this.acronymeEvent, this.participantModel).subscribe(
      (data) => { 
        let listValues = Object.values(data);
        this.resPost.existeParticipant = listValues[0];
        this.resPost.placesRestantes = listValues[1] ; 
        this.resPost.liaison = listValues[2];
      },
      (err) => this.handleError()
    );
  }

  handleError() {
    this.erreurFormulaire = true;
  }


}
