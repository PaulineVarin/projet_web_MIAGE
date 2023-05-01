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
  listEvenements:Evenement[] = [];

  constructor(private apiProjetWeb:ApiProjetWebService) {}

  ngOnInit(): void {
    this.apiProjetWeb.recupereListeEvenements().subscribe({
      next: data => this.listEvenements = data 
    }) ; 
  }

}
