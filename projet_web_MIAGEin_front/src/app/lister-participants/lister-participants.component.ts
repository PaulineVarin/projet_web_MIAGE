import { Component, OnInit } from '@angular/core';
import { Participant } from '../model/Participant';
import { ApiProjetWebService } from '../api-projet-web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lister-participants',
  templateUrl: './lister-participants.component.html',
  styleUrls: ['./lister-participants.component.css']
})
export class ListerParticipantsComponent implements OnInit {
  listParticipants: Participant[] = [];

  constructor(private apiProjetWeb: ApiProjetWebService,
    private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    let acronyme = this.routeActive.snapshot.params['acronyme'];
    this.apiProjetWeb.listerParticipants(acronyme).subscribe({
      next: data => this.listParticipants = data
    });

  }

}
