import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListerEvenementsComponent } from './lister-evenements/lister-evenements.component';
import { AfficherStatistiquesComponent } from './afficher-statistiques/afficher-statistiques.component';
import { InscriptionPersonneComponent } from './inscription-personne/inscription-personne.component';
import { ConsulterEvenementComponent } from './consulter-evenement/consulter-evenement.component';
import { DetailsEvenementComponent } from './details-evenement/details-evenement.component';
import { ListerParticipantsComponent } from './lister-participants/lister-participants.component';
import { AjouterEvenementComponent } from './ajouter-evenement/ajouter-evenement.component';

@NgModule({
  declarations: [
    AppComponent,
    ListerEvenementsComponent,
    AfficherStatistiquesComponent,
    InscriptionPersonneComponent,
    ConsulterEvenementComponent,
    DetailsEvenementComponent,
    ListerParticipantsComponent,
    AjouterEvenementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
