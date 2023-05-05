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
        db.all(sql,[acronymeEvent] ,(err, rows) => {
            if (err) {
                db.close();  
                reject(err);
            }
            else {
                let listParticipants = [];
                //Attendre la réponse pour toutes les lignes existantes
                const custPromListe = new Promise((resolve, reject) => {

                    if(rows.length != 0) {
                        console.log('Il existe des participants')
                        //Pour chaque ligne récupérer l'ensemble des participants
                        rows.forEach( async (row, index, array) => {
                            //Creation de l'objet participant
                            console.log(row)  ;
                            part = new Participant(row.nom, row.prenom, row.mail, row.numeroTelephone); 
                            listParticipants.push(part) ; 
                            //Une fois arrivé à la fin de la liste, renvoyer une réponse avec l'ensemble des participants
                            if (index === array.length - 1){
                                resolve(listParticipants);
                            } 
                        });
                    }
                    else {
                        console.log('Pas de participants') ; 
                        resolve(listParticipants) ; 
                    }
                    
                }); 
                
                //Si on a recuperer tout les participants , renvoyer la réponse (liste) récupérée
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


function ajouterParticipant(participant) {
    const custProm = new Promise((resolve, reject) => {
        //Insertion du participant
        let sql = 'INSERT INTO Participant VALUES(?, ? , ? , ?)' ; 

        //Ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();  
            }
            console.log('ouverture BDD ajouterParticipant');
        });

        db.run(sql, [participant.mail, participant.nom, participant.prenom,participant.numeroTelephone], function(err) {
            console.log("Run");
            if (err) {
                reject(err);
            }
            else {
                db.close() ; 
                resolve(participant) ; 
            }
        });


    }); 

    return custProm ; 
}


function supprimerParticipants(acronymeEvenement) {
    const custProm = new Promise((resolve, reject) => {
        let sql = 'DELETE FROM participe WHERE acronymeEvenement = ?' ; 

        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
                db.close();  
            }
            console.log('ouverture BDD suppression E');
        });

        db.run(sql, [acronymeEvenement], (err) => {
            if (err) {
                reject(err);
                console.log(error)
                db.close();  
            }

            else {
                console.log("1ere requete ok") ;
                db.close() ; 
                resolve() ; 
            }
        });
    });

    return custProm ; 
}

// exportation des méthodes
exports.getParticipants = getParticipants; 
exports.ajouterParticipant = ajouterParticipant ;
exports.supprimerParticipants = supprimerParticipants ;