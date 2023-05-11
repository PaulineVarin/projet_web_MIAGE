import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/Evenement';
import { ApiProjetWebService } from '../api-projet-web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-evenement',
  templateUrl: './details-evenement.component.html',
  styleUrls: ['./details-evenement.component.css']
})
export class DetailsEvenementComponent implements OnInit {
  //mise en place de la recuperation des infos provenant de l'API via le service
  evenement:Evenement = new Evenement() ; 
  

  constructor(private apiProjetWeb:ApiProjetWebService,
              private routeActive: ActivatedRoute) {}


  ngOnInit(): void {
    let acronyme = this.routeActive.snapshot.params['acronyme'] ; 
    this.apiProjetWeb.recupererInformationsEvenement(acronyme).subscribe({
      next: data => this.evenement = data 
    }) ; 
  }


}
