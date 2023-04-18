import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/Evenement';

@Component({
  selector: 'app-lister-evenements',
  templateUrl: './lister-evenements.component.html',
  styleUrls: ['./lister-evenements.component.css']
})
export class ListerEvenementsComponent implements OnInit {
  listEvenements:Evenement[] = [];

  constructor() {}

  ngOnInit(): void {
    const e1=new Evenement() ; 
    e1.nom='Pauline';
    e1.nbMaxParticipants=20 ; 

    this.listEvenements.push(e1)

    
  }
}
