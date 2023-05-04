import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/Evenement';
import { ApiProjetWebService } from '../api-projet-web.service';

@Component({
  selector: 'app-details-evenement',
  templateUrl: './details-evenement.component.html',
  styleUrls: ['./details-evenement.component.css']
})
export class DetailsEvenementComponent implements OnInit {
  //mise en place de la recuperation des infos provenant de l'API via le service
  evenement:Evenement = new Evenement() ; 
  

  constructor(private apiProjetWeb:ApiProjetWebService) {}


  ngOnInit(): void {
    let acronyme = 'AL3C2023' ; //A modfier une fois toutes les liaisons faites!!!
    this.apiProjetWeb.recupererInformationsEvenement(acronyme).subscribe({
      next: data => this.evenement = data 
    }) ; 
  }


}
