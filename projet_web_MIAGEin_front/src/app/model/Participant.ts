export class Participant {
    nom: string;
    prenom: string;
    mail: string;
    numeroTelephone: string;
    nbInscriptions: number ; 

    constructor() {
        {
            this.nom = "";
            this.prenom = "";
            this.mail = "";
            this.numeroTelephone = "";
            this.nbInscriptions= 0;
        }
    }
}