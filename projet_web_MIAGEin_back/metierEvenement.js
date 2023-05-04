//Partie Metier
var sqlite3 = require('sqlite3');


//Constructeur model evenement
function Evenement(pacronyme, pnom, padresse, pdescription,pdateOuverture,pdateFermeture,pdateEvenement, pnbParticiants,pnbMaxParticipants) {
    this.acronyme = pacronyme;
    this.nom=pnom;
    this.adresse = padresse;
    this.description = pdescription;
    this.dateOuverture = pdateOuverture;
    this.dateFermeture = pdateFermeture;
    this.dateEvenement = pdateEvenement;
    this.nbParticipants = pnbParticiants ; 
    this.nbMaxParticipants = pnbMaxParticipants;
}

//Methodes metier

//Recuperation de tout les evenements
function getEvenements () {
    //Mise en place de la promise
    const custProm = new Promise((resolve, reject) => {

        //recuperation de l'information
        let sql = 'SELECT * FROM evenement' ; 

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
            console.log('ouverture BDD');
        });
        
        //traitement de toutes les lignes evenements
        db.all(sql, (err, rows) => {
            if (err) {
                db.close();  
                reject(err);
            }
            else {
                let listEvenements = [];
                //Attendre la réponse pour toutes les lignes existantes
                const custPromListe = new Promise((resolve, reject) => {
                    //Pour chaque ligne récupérer le nombre de participants
                    rows.forEach( async (row, index, array) => {
                        //Recuperation du nombre de participants
                        let nbParticipants = await getNbPartipants(row.acronyme) ;
                        //Creation nouvel evenement
                        evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement,nbParticipants,row.nbMaxParticipants); 
                        listEvenements.push(evt) ; 
                        //Une fois arrivé à la fin de la liste, renvoyer une réponse avec les participants pour chaque evenement
                        if (index === array.length - 1){
                            resolve(listEvenements);
                        } 
                    });
                })
                
                //Lorsque la réponse des participants pour chaque ligne est donnée, renvoyer la réponse (liste) récupérée
                custPromListe.then(function(){
                    console.log("FIN");
                    db.close();  
                    resolve(custPromListe);
                });

            }  
        });
              
    });

    return custProm;
};

//Recuperation des evenements encore disponibles
function getEvenementsCourants() {
    //Mise en place de la promise
    const custProm = new Promise((resolve, reject) => {

        //recuperation de l'information
        let sql = 'SELECT * FROM evenement WHERE dateFermeture > date() ;' ; 

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
            console.log('ouverture BDD');
        });
        
        //traitement de toutes les lignes evenements
        db.all(sql, (err, rows) => {
            if (err) {
                db.close();  
                reject(err);
            }
            else {
                let listEvenements = [];
                //Attendre la réponse pour toutes les lignes existantes
                const custPromListe = new Promise((resolve, reject) => {
                    //Pour chaque ligne récupérer le nombre de participants
                    rows.forEach( async (row, index, array) => {
                        //Recuperation du nombre de participants
                        let nbParticipants = await getNbPartipants(row.acronyme) ;
                        //Creation nouvel evenement
                        evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement,nbParticipants,row.nbMaxParticipants); 
                        listEvenements.push(evt) ; 
                        //Une fois arrivé à la fin de la liste, renvoyer une réponse avec les participants pour chaque evenement
                        if (index === array.length - 1){
                            resolve(listEvenements);
                        } 
                    });
                })
                
                //Lorsque la réponse des participants pour chaque ligne est donnée, renvoyer la réponse (liste) récupérée
                custPromListe.then(function(){
                    console.log("FIN");
                    db.close();  
                    resolve(custPromListe);
                });

            }  
        });
              
    });

    return custProm;
    

}

//Recuperation des details d'un evenement
function getInformationsEvenement(acronymeEvenement) {
    const custProm = new Promise((resolve, reject) => {
        //recuperation de l'information
        let sql = 'SELECT * FROM evenement WHERE acronyme = ? ;' ; 

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
            console.log('ouverture BDD');
        });

        //traitement de la ligne
        db.get(sql, [acronymeEvenement], async (err, row) => {
            if(err) {
                db.close();  
                reject(err);
            }
            else {
                let infosEvenement ; 
                let evt ; 
                //Recuperation du nombre de participants
                let nbParticipants = await getNbPartipants(acronymeEvenement) ;
                //Creation nouvel evenement
                evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement,nbParticipants,row.nbMaxParticipants);  
                infosEvenement.push([evt]); 
                //Recuperer les informations sur l'ensemble des participants (liste contenant tout les participants) => en attente de la partie de Morgan
                db.close() ; 
                resolve(infosEvenement) ; 
            }
        });

    });
    return custProm ; 
};


//Ajout d'un nouveau evenement
function ajouterEvenement(evenement) {
    const custProm = new Promise((resolve, reject) => {
        //Insertion de l'evenement
        let sql = 'INSERT INTO Evenement VALUES(?, ?, ?, ? , ?, ?, ?, ?)' ; 

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();  
            }
            console.log('ouverture BDD ajouterEvenement');
        });

        db.run(sql, [evenement.acronyme, evenement.nom, evenement.adresse,evenement.description, evenement.dateOuverture, evenement.dateFermeture,evenement.dateEvenement, evenement.nbMaxParticipants], function(err) {
            console.log("Run");
            if (err) {
                reject(err);
            }
            else {
                db.close() ; 
                resolve(evenement) ; 
            }
        });
    });
    return custProm ; 
}

//Suppression d'un evenement
function supprimerEvenement(acronymeEvenement) {
    const custProm = new Promise((resolve, reject) => {
        //Suppression du lien entre les participants et l'evenement
        sqlLienPE = 'DELETE FROM Participe WHERE acronyme = ?';
        //Suppression de l'evenement
        sql = 'DELETE FROM Evenemement WHERE acronyme= ?' ; 
        
        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();  
            }
            console.log('ouverture BDD supprimerEvenement');
        });

    
    
    });

    return custProm ; 
}

//Recuperation du nombre de participants
function getNbPartipants(acronymeEvent) {
    const custProm = new Promise((resolve, reject) => {
        //recuperation de l'information
        let sql = 'SELECT COUNT(*) as res FROM Participe where acronymeEvenement = ?' ;

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();  
            }
            console.log('ouverture BDD nb participants');
        });

        db.get(sql, [acronymeEvent], (err,row) => {
            if (err) {
                reject(err);
            }
            else {
                console.log("resolve");
                resolve(row.res) ; 
            }
        });
        
        //Fermeture de la connexion
        db.close((err) => {
            if (err) {
              return err ; 
            }
            console.log('Close the database connection.');
        });

    }); 

    return custProm;
}


        
exports.getEvenements = getEvenements ; 
exports.getEvenementsCourants = getEvenementsCourants ; 
exports.getInformationsEvenement = getInformationsEvenement ; 
exports.ajouterEvenement = ajouterEvenement ; 