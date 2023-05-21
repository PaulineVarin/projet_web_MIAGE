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
import { ApiProjetWebService } from './api-projet-web.service';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'listerEvenement', component: ListerEvenementsComponent},
  { path: 'afficherStatistiques', component: AfficherStatistiquesComponent},
  { path: 'ajouterEvenement', component: AjouterEvenementComponent},
  { path: 'consulterEvenement/:acronyme', component: ConsulterEvenementComponent},
  { path: 'detailsEvenement', component: DetailsEvenementComponent},
  { path: 'inscriptionPersonne/:acronyme', component: InscriptionPersonneComponent},
  { path: 'listerParticipants', component: ListerParticipantsComponent},
  { path: '', redirectTo: 'listerEvenement', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ListerEvenementsComponent,
    AfficherStatistiquesComponent,
    InscriptionPersonneComponent,
    ConsulterEvenementComponent,
    DetailsEvenementComponent,
    ListerParticipantsComponent,
    AjouterEvenementComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [ApiProjetWebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
