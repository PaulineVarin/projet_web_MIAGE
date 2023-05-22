import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/Evenement';
import { ApiProjetWebService } from '../api-projet-web.service';

@Component({
  selector: 'app-afficher-statistiques',
  templateUrl: './afficher-statistiques.component.html',
  styleUrls: ['./afficher-statistiques.component.css']
})
export class AfficherStatistiquesComponent implements OnInit {
  //mise en place de la recuperation des infos provenant de l'API via le service
  listEvenements: Evenement[] = [];
  nbEvenements: number = 0;
  nbParticipantsMoyens: number = 0;


  constructor(private apiProjetWeb: ApiProjetWebService) { }

  ngOnInit(): void {
    this.apiProjetWeb.recupererListeEvenements().subscribe({
      next: data => this.listEvenements = data
    });

    this.apiProjetWeb.recupererNbEvenements().subscribe({
      next: data => this.nbEvenements = data
    });

    this.apiProjetWeb.calculMoyenneParticipants().subscribe({
      next:data => this.nbParticipantsMoyens = data
    }); 
  }

}
