//Partie Metier
var sqlite3 = require('sqlite3');
var metierParticipant = require('./metierParticipants');


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
                });
                
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
                let evt ; 
                //Recuperation du nombre de participants
                let nbParticipants = await getNbPartipants(acronymeEvenement) ;
                //Creation nouvel evenement
                evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement,nbParticipants,row.nbMaxParticipants);  
                //Recuperer les informations sur l'ensemble des participants (liste contenant tout les participants) => en attente de la partie de Morgan
                db.close() ; 
                resolve(evt) ; 
            }
        });

    });
    return custProm ; 
};


//Ajout d'un nouveau evenement
async function ajouterEvenement(evenement) {
    //tester si l'evenement n'existe pas deja
    let resExisteE = await evenementExiste(evenement.acronyme) ;  
    //JSON qui contient le deroulement de l'execution de la methode
    let resOperation = {}; 

    const custProm = new Promise((resolve, reject) => {
        if(resExisteE) {
            console.log("Evenement existe") ; 
            resOperation.evenementExiste = true ; 
            resolve(resOperation) ; 

        } else {
            console.log("Evenement existe pas") ;
            resOperation.evenementExiste = false ;
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
                    resOperation.insertionE = true ; 
                    db.close() ; 
                    resolve(resOperation) ; 
                }
            });
        }    
    });

    return custProm ; 
}

//Suppression d'un evenement
async function supprimerEvenement(acronymeEvenement) {
    await metierParticipant.supprimerParticipants(acronymeEvenement) ; 
    
    const custProm = new Promise((resolve, reject) => {
        //ecriture de la requete
        let sql = 'DELETE FROM evenement WHERE acronyme = ?' ; 

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();  
            }
            console.log('ouverture BDD suppression E');
        });

        db.run(sql, [acronymeEvenement], async (err) => {
            if (err) {
                reject(err);
                console.log(error)
                db.close();  
            }

            else {
                console.log("2eme requete ok") ;
                db.close() ;
                resolve() ; 
            }
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

//Recuperation du nombre d'evenements
function getNbEvenements() {
    const custProm = new Promise((resolve, reject) => {
        //recuperation de l'information
        let sql = 'SELECT COUNT(*) as res FROM Evenement' ;

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();  
            }
            console.log('ouverture BDD nb evenements');
        });

        db.get(sql, (err,row) => {
            if (err) {
                reject(err);
            }
            else {
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

function evenementExiste(pacronyme) {
    const custProm = new Promise((resolve, reject) => {
        //requete pour verifier l'existence du participant
        let sql = 'SELECT COUNT(*) as c FROM Evenement WHERE acronyme = ?' ; 

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();  
            }
            console.log('ouverture BDD evenementExiste');
        });

        db.get(sql, [pacronyme], (err,row) => {
            if(err) {
                reject(err);
                db.close() ; 
            }
            else {
                let res; 
                if(row.c == 1 ) {
                    res = true ; 
                    db.close() ;
                } 
                else {
                    res = false ; 
                    db.close() ;
                }
                resolve(res) ;      
            }
        });
    }); 
    return custProm ; 
};


        
exports.getEvenements = getEvenements ; 
exports.getEvenementsCourants = getEvenementsCourants ; 
exports.getInformationsEvenement = getInformationsEvenement ;
exports.getNbEvenements = getNbEvenements ;  
exports.ajouterEvenement = ajouterEvenement ; 
exports.supprimerEvenement = supprimerEvenement ; 