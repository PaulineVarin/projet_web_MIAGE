export class Evenement {
    acronyme:string;
    nom:string;
    adresse:string;
    description:string ; 
    dateOuverture:Date;
    dateFermeture:Date;
    nbMaxParticipants:number;
    dateEvenement:Date;

    constructor () {
        this.acronyme ="";
        this.nom="";
        this.adresse="";
        this.description="";
        this.dateOuverture= new Date() ;
        this.dateFermeture=new Date() ; 
        this.dateEvenement=new Date() ; 
        this.nbMaxParticipants=0;
    }
}