import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiProjetWebService } from '../api-projet-web.service';

@Component({
  selector: 'app-consulter-evenement',
  templateUrl: './consulter-evenement.component.html',
  styleUrls: ['./consulter-evenement.component.css']
})
export class ConsulterEvenementComponent implements OnInit{
  acronymeEvent:String = "" ;

  constructor(private apiProjetWeb:ApiProjetWebService,
              private routeActive: ActivatedRoute) {}

  ngOnInit(): void {
    this.acronymeEvent = this.routeActive.snapshot.params['acronyme'] ; 
  }

  supprimerEvenement() {
    console.log("Hello sup");
    this.apiProjetWeb.supprimerEvenement(this.acronymeEvent).subscribe(
    (data) => {
              },
        (err) => this.handleError()
      );

  }

  handleError(){
    console.log("Erreur lors de la suppression")
  }

}
