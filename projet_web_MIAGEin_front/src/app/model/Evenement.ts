export class Evenement {
    acronyme:string;
    nom:string;
    adresse:string;
    description:string ; 
    dateOuverture:String;
    dateFermeture:String;
    nbMaxParticipants:number;
    nbParticipants:number;
    dateEvenement:String;

    constructor () {
        this.acronyme ="";
        this.nom="";
        this.adresse="";
        this.description="";
        this.dateOuverture="";
        this.dateFermeture="" ; 
        this.dateEvenement="" ; 
        this.nbParticipants=0 ; 
        this.nbMaxParticipants=0;
    }
}