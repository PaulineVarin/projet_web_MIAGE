import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/Evenement';
import { ApiProjetWebService } from '../api-projet-web.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ajouter-evenement',
  templateUrl: './ajouter-evenement.component.html',
  styleUrls: ['./ajouter-evenement.component.css']
})
export class AjouterEvenementComponent implements OnInit  {
  //mise en place des elements pour la page
  evenementModel:Evenement = new Evenement();

  constructor(private apiProjetWeb:ApiProjetWebService,
              private routeActive: ActivatedRoute) {}



  ngOnInit(): void {
    //Mise en forme des dates
    //datePipe.transform(evenementModel,"yyyy-MM-dd")
   
  }
  

}
