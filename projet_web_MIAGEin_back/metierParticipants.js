// Partie Metier
var sqlite3 = require('sqlite3');

// Constructeur model participant
function Participant(pnom, pprenom, pmail, ptel) {
    this.nom = pnom;
    this.prenom = pprenom;
    this.mail = pmail;
    this.numeroTelephone = ptel;
}

// Méthodes métier


//Récupère toutes les informations des participants à un évènement
function getParticipants(acronymeEvent) {

    //Mise en place de la promise
    const custProm = new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Participant pt, Participe pe WHERE pt.mail = pe.mail AND acronymeEvenement = ?'

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
            console.log('ouverture BDD');
        });

        //traitement de toutes les lignes evenements
        db.all(sql, [acronymeEvent], (err, rows) => {
            if (err) {
                db.close();
                reject(err);
            }
            else {
                let listParticipants = [];
                //Attendre la réponse pour toutes les lignes existantes
                const custPromListe = new Promise((resolve, reject) => {

                    if (rows.length != 0) {
                        console.log('Il existe des participants')
                        //Pour chaque ligne récupérer l'ensemble des participants
                        rows.forEach(async (row, index, array) => {
                            //Creation de l'objet participant
                            part = new Participant(row.nom, row.prenom, row.mail, row.numeroTelephone);
                            listParticipants.push(part);
                            //Une fois arrivé à la fin de la liste, renvoyer une réponse avec l'ensemble des participants
                            if (index === array.length - 1) {
                                resolve(listParticipants);
                            }
                        });
                    }
                    else {
                        console.log('Pas de participants');
                        resolve(listParticipants);
                    }

                });

                //Si on a recuperer tout les participants , renvoyer la réponse (liste) récupérée
                custPromListe.then(function () {
                    console.log('FIN');
                    db.close();
                    resolve(custPromListe);
                });

            }
        });
    });

    return custProm;
}


async function ajouterParticipant(pacronyme, pparticipant) {
    //Verification de l'existance du participant
    let resExisteP = await participantExiste(pparticipant.mail);

    //JSON qui contient le deroulement de l'execution de la methode
    let resOperation = {};

    const custProm = new Promise(async (resolve, reject) => {
        //Ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
            console.log('ouverture BDD ajouterParticipant');
        });

        if (resExisteP) {
            resOperation.existeParticipant = true;
            console.log('Participant existe');
            //verification que le participant n'est pas déjà présent dans l'evenement
            let resLiaison = await liaisonParticipantEvenementExiste(pacronyme, pparticipant.mail);
            if (resLiaison) {
                resOperation.liaison = false;
                resolve(resOperation);
            }
            else {
                let resLiaison = await lierParticipant(pacronyme, pparticipant.mail);
                resOperation.liaison = resLiaison;
                db.close();
                resolve(resOperation);
            }

        } else {
            resOperation.existeParticipant = false;
            console.log('Participant existe pas');

            //creation du participant et liaison a l'evenement
            let sql = 'INSERT INTO Participant VALUES(?, ? , ? , ?)';

            db.run(sql, [pparticipant.mail, pparticipant.nom, pparticipant.prenom, pparticipant.numeroTelephone], async (err) => {
                console.log('Run');
                if (err) {
                    reject(err);
                }
                else {
                    let resLiaison = await lierParticipant(pacronyme, pparticipant.mail);
                    resOperation.liaison = resLiaison;
                    db.close();
                    resolve(resOperation);
                }
            });
        }
    });

    return custProm;
}

function participantExiste(pmail) {
    const custProm = new Promise((resolve, reject) => {
        //requete pour verifier l'existence du participant
        let sql = 'SELECT COUNT(*) as c FROM Participant WHERE mail = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
            console.log('ouverture BDD participantExiste');
        });

        db.get(sql, [pmail], (err, row) => {
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

function liaisonParticipantEvenementExiste(pacronyme, pmail) {
    const custProm = new Promise((resolve, reject) => {
        //requete pour verifier l'existence du participant
        let sql = 'SELECT COUNT(*) as c FROM Participe WHERE mail = ? AND acronymeEvenement = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
            console.log('ouverture BDD liaisonParticipantEvenementExiste');
        });

        db.get(sql, [pmail, pacronyme], (err, row) => {
            if (err) {
                reject(err);
                db.close();
            }
            else {
                let res;
                if (row.c > 0) {
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

}

function lierParticipant(pacronyme, pmail) {
    const custProm = new Promise((resolve, reject) => {
        //requete pour lier le participant et l'evenement 
        let sql = 'INSERT INTO Participe VALUES(?, ?)';
        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
            console.log('ouverture BDD liaisonPE');
        });

        db.run(sql, [pmail, pacronyme], async (err) => {
            if (err) {
                reject(err);
                db.close();
            }
            else {
                console.log('liaison ok');
                let res = true;
                db.close();
                resolve(res);
            }
        });
    });
    return custProm;

};


function supprimerParticipants(acronymeEvenement) {
    const custProm = new Promise((resolve, reject) => {
        let sql = 'DELETE FROM participe WHERE acronymeEvenement = ?';

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();
            }
            console.log('ouverture BDD suppression P');
        });

        db.run(sql, [acronymeEvenement], (err) => {
            if (err) {
                reject(err);
                console.log(error)
                db.close();
            }

            else {
                console.log('1ere requete ok');
                db.close();
                resolve();
            }
        });
    });

    return custProm;
}

// exportation des méthodes
exports.getParticipants = getParticipants;
exports.ajouterParticipant = ajouterParticipant;
exports.supprimerParticipants = supprimerParticipants;