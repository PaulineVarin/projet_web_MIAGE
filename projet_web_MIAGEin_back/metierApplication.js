//Partie Metier
var sqlite3 = require('sqlite3');

//Methodes metier

//Constructeur evenement
function Evenement(pacronyme, pnom, padresse, pdescription,pdateOuverture,pdateFermeture,pdateEvenement, pnbMaxParticipants) {
    this.acronyme = pacronyme;
    this.nom=pnom;
    this.adresse = padresse;
    this.description = pdescription;
    this.dateOuverture = pdateOuverture;
    this.dateFermeture = pdateFermeture;
    this.dateEvenement = pdateEvenement;
    this.nbMaxParticipants = pnbMaxParticipants;
}



//Recuperation des evenement
function getEvenement () {
    listEvenements = [];
    //ouverture de la connexion
    const custProm = new Promise((resolve, reject) => {

        //recuperation de l'information
        let sql = 'SELECT * FROM evenement' ; 

        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
            console.log('ouverture BDD');
        });
        
        db.each(sql, (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                //Creation nouvel evenement
                evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement, row.nbMaxParticipants); 
                listEvenements.push(evt) ; 
            } 
            resolve(listEvenements); 
        });
        db.close(); 
    });

    return custProm;
};
        

exports.getEvenement = getEvenement ; 