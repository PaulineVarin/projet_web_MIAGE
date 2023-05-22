import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/Evenement';
import { ApiProjetWebService } from '../api-projet-web.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-ajouter-evenement',
  templateUrl: './ajouter-evenement.component.html',
  styleUrls: ['./ajouter-evenement.component.css']
})

export class AjouterEvenementComponent implements OnInit {
  //mise en place des elements pour la page
  evenementModel: Evenement = new Evenement();
  envoiFomulaire = false;
  erreurFormulaire = false;
  resPost = { "evenementExiste": false, "insertionE": false };


  constructor(private apiProjetWeb: ApiProjetWebService,
    private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    //Mise en forme des dates
    this.evenementModel.dateEvenement = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.evenementModel.dateFermeture = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.evenementModel.dateOuverture = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  rajoutEvenement() {

    console.log("Debut rajoutEvenement");
    this.envoiFomulaire = true;
    this.erreurFormulaire = false;
    //Récupération d'un Observable auquel on se souscrit, on récupère le JSON si valide, sinon on gère l'erreur
    this.apiProjetWeb.ajouterEvenement(this.evenementModel).subscribe(
      (data) => {
        console.log(data)
        let listValues = Object.values(data);
        this.resPost.evenementExiste = listValues[0];
        this.resPost.insertionE = listValues[1];
      },
      (err) => this.handleError()
    );

    console.log("Fin rajoutEvenement");
  }

  handleError() {
    this.erreurFormulaire = true;
  }

}
