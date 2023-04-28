//Partie Metier
var sqlite3 = require('sqlite3');
//Liste evenements


//Constructeur tous evenements
function Evenement(pacronyme,pnom, padresse, pdescription, pnbMaxParticipants ) {
    this.acronyme = pacronyme ;
    this.nom = pnom ;
    this.description = pdescription ;
    this.adresse = padresse ; 
    this.dateOuverture = new Date() ; 
    this.dateFermeture = new Date() ; 
    this.dateEvenement = new Date() ; 
    this.nbMaxParticipants = pnbMaxParticipants ; 
}

//Methodes metier

//Recuperation 1 evenement*
function getEvenement (pacronyme) {
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
    
        db.get(sql, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                //db.close();  
                db.close();
                resolve(data);
            }
        });
                //return x;
    });

    return custProm;
};
        

exports.getEvenement = getEvenement ; 