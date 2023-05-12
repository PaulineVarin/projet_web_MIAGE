import { Component, OnInit } from '@angular/core';
import { Participant } from '../model/Participant';
import { Evenement } from '../model/Evenement';
import { ActivatedRoute } from '@angular/router';
import { ApiProjetWebService } from '../api-projet-web.service';

@Component({
  selector: 'app-details-participant',
  templateUrl: './details-participant.component.html',
  styleUrls: ['./details-participant.component.css']
})
export class DetailsParticipantComponent implements OnInit {
  participant:Participant = new Participant() ; 
  listeEvenements:Evenement[] = [] ; 

  constructor(private apiProjetWeb: ApiProjetWebService,
    private routeActive: ActivatedRoute) { }


  ngOnInit(): void {
    let pmail = this.routeActive.snapshot.params['mail'];
    this.apiProjetWeb.getInformationsParticipant(pmail).subscribe({
      next: data => this.participant = data
    });

    this.apiProjetWeb.getEvenementsParticipants(pmail).subscribe({
      next: data => this.listeEvenements = data
    })
    
  }

}
