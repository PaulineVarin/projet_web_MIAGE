import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/Evenement';
import { ApiProjetWebService } from '../api-projet-web.service';

@Component({
  selector: 'app-lister-evenements',
  templateUrl: './lister-evenements.component.html',
  styleUrls: ['./lister-evenements.component.css']
})
export class ListerEvenementsComponent implements OnInit {
  //mise en place de la recuperation des infos provenant de l'API via le service
  listEvenements:Evenement[] = [];

  constructor(private apiProjetWeb:ApiProjetWebService) {}

  ngOnInit(): void {
    this.apiProjetWeb.recupererListeEvenementsCourants().subscribe({
      next: data => this.listEvenements = data 
    }) ; 
  }
}
