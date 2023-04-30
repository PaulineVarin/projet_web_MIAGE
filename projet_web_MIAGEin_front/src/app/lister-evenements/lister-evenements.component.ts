import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/Evenement';
import { ApiProjetWebService } from '../api-projet-web.service';

@Component({
  selector: 'app-lister-evenements',
  templateUrl: './lister-evenements.component.html',
  styleUrls: ['./lister-evenements.component.css']
})
export class ListerEvenementsComponent implements OnInit {
  listEvenements:Evenement[] = [];

  constructor(private apiProjetWeb:ApiProjetWebService) {}

  ngOnInit(): void {
    this.apiProjetWeb.recupereListeEvenement().subscribe({
      next: data => this.listEvenements = data 
    }) ; 


    /*
    const e1=new Evenement() ; 
    e1.nom='Pauline';
    e1.nbMaxParticipants=20 ; 

    this.listEvenements.push(e1);
    */
    
  }
}
