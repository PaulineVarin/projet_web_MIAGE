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
import { AuthGuard } from './_helpers/auth.guards';
import { DetailsParticipantComponent } from './details-participant/details-participant.component';


const appRoutes: Routes = [
  { path: 'listerEvenement', component: ListerEvenementsComponent},
  { path: 'afficherStatistiques', component: AfficherStatistiquesComponent, canActivate: [AuthGuard]},
  { path: 'ajouterEvenement', component: AjouterEvenementComponent, canActivate: [AuthGuard]},
  { path: 'consulterEvenement/:acronyme', component: ConsulterEvenementComponent, canActivate: [AuthGuard]},
  { path: 'detailsEvenement', component: DetailsEvenementComponent, canActivate: [AuthGuard]},
  { path: 'inscriptionPersonne/:acronyme', component: InscriptionPersonneComponent},
  { path: 'listerParticipants', component: ListerParticipantsComponent, canActivate: [AuthGuard]},
  { path: 'detailsParticipants/:mail', component : DetailsParticipantComponent},
  { path: '', redirectTo: ([AuthGuard] ? 'afficherStatistiques' : 'listerEvenement'), pathMatch: 'full'}
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
    LoginComponent,
    DetailsParticipantComponent
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
