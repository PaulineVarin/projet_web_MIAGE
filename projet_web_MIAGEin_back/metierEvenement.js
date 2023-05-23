//Partie Metier
var sqlite3 = require('sqlite3');
var metierParticipant = require('./metierParticipants');


//Constructeur model evenement
function Evenement(pacronyme, pnom, padresse, pdescription, pdateOuverture, pdateFermeture, pdateEvenement, pnbParticiants, pnbMaxParticipants) {
    this.acronyme = pacronyme;
    this.nom = pnom;
    this.adresse = padresse;
    this.description = pdescription;
    this.dateOuverture = pdateOuverture;
    this.dateFermeture = pdateFermeture;
    this.dateEvenement = pdateEvenement;
    this.nbParticipants = pnbParticiants;
    this.nbMaxParticipants = pnbMaxParticipants;
}

//Methodes metier
//Fonction compare pour trier les résultats de la récupération des événements
function compare(a, b) {
    if (a.dateFermeture < b.dateFermeture) {
        return -1;
    }
    if (a.dateFermeture > b.dateFermeture) {
        return 1;
    }
    return 0;
}

//Recuperation d'un evenement en fonction de son acronyme
function getEvenement(pacronyme) {
    const custProm = new Promise((resolve, reject) => {
        //recuperation de l'information
        let sql = 'SELECT * FROM evenement WHERE acronyme = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
        });

        db.get(sql, [pacronyme], async (err, row) =>{
            if (err) {
                db.close();
                reject(err);
            }
            
            let nbParticipants = await getNbParticipants(pacronyme);
            let evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement, nbParticipants, row.nbMaxParticipants);
            db.close();
            resolve(evt)
        });
    });
    return custProm ; 

}

//Recuperation de tout les evenements
function getEvenements() {
    //Mise en place de la promise
    const custProm = new Promise((resolve, reject) => {

        //recuperation de l'information
        let sql = 'SELECT * FROM evenement;';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
        });

        //traitement de toutes les lignes evenements
        db.all(sql, (err, rows) => {
            if (err) {
                db.close();
                reject(err);
            }
            else {
                //La variable compt sert à s'assurer que si la dernière boucle termine avant la première, le nombre de lignes attendues est bien récupéré
                let compt = 0;
                let listEvenements = [];
                //Attendre la réponse pour toutes les lignes existantes
                //Pour chaque ligne récupérer le nombre de participants
                rows.forEach(async (row, index, array) => {
                    //Recuperation du nombre de participants
                    let nbParticipants = await getNbParticipants(row.acronyme);
                    compt = compt + 1;
                    //Creation nouvel evenement
                    evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement, nbParticipants, row.nbMaxParticipants);
                    listEvenements.push(evt);
                    //Une fois arrivé à la fin de la liste, renvoyer une réponse avec les participants pour chaque evenement
                    if (compt == array.length) {
                        listEvenements.sort(compare);
                        resolve(listEvenements);
                    }
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
        let sql = 'SELECT * FROM evenement WHERE dateFermeture > date() ;';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
        });

        //traitement de toutes les lignes evenements
        db.all(sql, (err, rows) => {
            if (err) {
                db.close();
                reject(err);
            }
            else {
                //La variable compt sert à s'assurer que si la dernière boucle termine avant la première, le nombre de lignes attendues est bien récupéré
                let compt = 0;
                let listEvenements = [];
                //Attendre la réponse pour toutes les lignes existantes
                //Pour chaque ligne récupérer le nombre de participants
                rows.forEach(async (row, index, array) => {
                    //Recuperation du nombre de participants
                    let nbParticipants = await getNbParticipants(row.acronyme);
                    compt = compt + 1;
                    //Creation nouvel evenement
                    evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement, nbParticipants, row.nbMaxParticipants);
                    listEvenements.push(evt);
                    //Une fois arrivé à la fin de la liste, renvoyer une réponse avec les participants pour chaque evenement
                    if (compt == array.length) {
                        listEvenements.sort(compare);
                        resolve(listEvenements);
                    }
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
        let sql = 'SELECT * FROM evenement WHERE acronyme = ? ;';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
        });

        //traitement de la ligne
        db.get(sql, [acronymeEvenement], async (err, row) => {
            if (err) {
                db.close();
                reject(err);
            }
            else {
                let evt;
                //Recuperation du nombre de participants
                let nbParticipants = await getNbParticipants(acronymeEvenement);
                //Creation nouvel evenement
                evt = new Evenement(row.acronyme, row.nom, row.adresse, row.description, row.dateOuverture, row.dateFermeture, row.dateEvenement, nbParticipants, row.nbMaxParticipants);
                //Recuperer les informations sur l'ensemble des participants (liste contenant tout les participants) => en attente de la partie de Morgan
                db.close();
                resolve(evt);
            }
        });

    });
    return custProm;
};


//Ajout d'un nouveau evenement
async function ajouterEvenement(evenement) {
    //tester si l'evenement n'existe pas deja
    let resExisteE = await evenementExiste(evenement.acronyme);
    //JSON qui contient le deroulement de l'execution de la methode
    let resOperation = {};

    const custProm = new Promise((resolve, reject) => {
        if (resExisteE) {
            resOperation.evenementExiste = true;
            resolve(resOperation);

        } else {
            resOperation.evenementExiste = false;
            //Insertion de l'evenement
            let sql = 'INSERT INTO Evenement VALUES(?, ?, ?, ? , ?, ?, ?, ?)';

            //ouverture de la connexion
            let db = new sqlite3.Database('database/databaseProject.db', err => {
                if (err) {
                    reject(err);
                    db.close();
                }
            });

            db.run(sql, [evenement.acronyme, evenement.nom, evenement.adresse, evenement.description, evenement.dateOuverture, evenement.dateFermeture, evenement.dateEvenement, evenement.nbMaxParticipants], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resOperation.insertionE = true;
                    db.close();
                    resolve(resOperation);
                }
            });
        }
    });

    return custProm;
}

//Suppression d'un evenement
async function supprimerEvenement(acronymeEvenement) {
    await metierParticipant.supprimerParticipants(acronymeEvenement);

    const custProm = new Promise((resolve, reject) => {
        //ecriture de la requete
        let sql = 'DELETE FROM evenement WHERE acronyme = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
        });

        db.run(sql, [acronymeEvenement], async (err) => {
            if (err) {
                reject(err);
                db.close();
            }

            else {
                db.close();
                resolve();
            }
        });
    });


    return custProm;
}


//Recupere les evenements auquel participe un participant
function getEvenementsParticipant(pmail) {
    //fonction deja existente pour retourner les infos d'un evenement
    const custProm = new Promise((resolve, reject) => {
        //Recuperation de l'information
        let sql = 'SELECT acronymeEvenement FROM Participe WHERE mail = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
        });


        //traitement de toutes les lignes evenements
        db.all(sql, [pmail] ,(err, rows) => {
            if (err) {
                db.close();
                reject(err);
            }
            else {
                //La variable compt sert à s'assurer que si la dernière boucle termine avant la première, le nombre de lignes attendues est bien récupéré
                let compt = 0;
                let listEvenements = [];
                //Attendre la réponse pour toutes les lignes existantes
                //Pour chaque ligne récupérer les informations sur l'evenement
                rows.forEach(async (row, index, array) => {
                    //Recuperation les informations sur l'evenement
                    let evt = await getInformationsEvenement(row.acronymeEvenement);
                    listEvenements.push(evt);
                    compt = compt + 1;
                    //Une fois arrivé à la fin de la liste, renvoyer une réponse avec l'ensemble des evenements
                    if (compt == array.length) {
                        listEvenements.sort(compare);
                        db.close() ; 
                        resolve(listEvenements);
                    }
                });

                if(rows.length ==  0) {
                    db.close() ; 
                    let listEvenementsVide = [] ; 
                    resolve(listEvenementsVide) ; 
                }
            }
        });

    });
    return custProm ; 

}


//Calcul du nombre d'evenements pour un participant
function getNbEvenementsParticipant(pmail) {
    const custProm = new Promise((resolve, reject) => {
        //Recuperation de l'information
        let sql = 'SELECT COUNT(*) as res FROM Participe WHERE mail = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
        });

        db.get(sql, [pmail], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                db.close();
                resolve(row.res);
            }
        });
    });
    return custProm;
}




//Recuperation du nombre de participants
function getNbParticipants(acronymeEvent) {
    const custProm = new Promise((resolve, reject) => {
        //recuperation de l'information
        let sql = 'SELECT COUNT(*) as res FROM Participe where acronymeEvenement = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
        });

        db.get(sql, [acronymeEvent], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                db.close();
                resolve(row.res);
            }
        });
    });

    return custProm;
}

//Recuperation du nombre d'evenements
function getNbEvenements() {
    const custProm = new Promise((resolve, reject) => {
        //recuperation de l'information
        let sql = 'SELECT COUNT(*) as res FROM Evenement';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
        });

        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row.res);
            }
        });

        //Fermeture de la connexion
        db.close((err) => {
            if (err) {
                return err;
            }
        });

    });

    return custProm;
}

function evenementExiste(pacronyme) {
    const custProm = new Promise((resolve, reject) => {
        //requete pour verifier l'existence du participant
        let sql = 'SELECT COUNT(*) as c FROM Evenement WHERE acronyme = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
        });

        db.get(sql, [pacronyme], (err, row) => {
            if (err) {
                reject(err);
                db.close();
            }
            else {
                let res;
                if (row.c == 1) {
                    res = true;
                    db.close();
                }
                else {
                    res = false;
                    db.close();
                }
                resolve(res);
            }
        });
    });
    return custProm;
};


exports.getEvenement = getEvenement ; 
exports.getEvenements = getEvenements;
exports.getEvenementsCourants = getEvenementsCourants;
exports.getInformationsEvenement = getInformationsEvenement;

exports.getNbEvenements = getNbEvenements;

exports.ajouterEvenement = ajouterEvenement;
exports.supprimerEvenement = supprimerEvenement;

exports.getNbEvenementsParticipant = getNbEvenementsParticipant;
exports.getEvenementsParticipant = getEvenementsParticipant;