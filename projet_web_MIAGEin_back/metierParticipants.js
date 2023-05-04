// Partie Metier

var sqlite3 = require('sqlite3');

/**
 *  Constructeur
 */ 
function Participant(nom, prenom, mail, tel) {
    this.nom = nom;
    this.prenom = prenom;
    this.mail = mail;
    this.tel = tel;
}

// Méthodes métier

/**
 * Récupère toutes les informations des participants à un évènement
 * @param idEvenement 
 */
function getParticipants(idEvenement) {
    
    //Mise en place de la promise
    const custProm = new Promise((resolve, reject) => {
        let sql = 'SELECT nom, prenom, pant.mail, numeroTelephone FROM Participant pant JOIN Participe pape ON pant.mail = pape.mail WHERE pape.acronymeEvenement = "' + idEvenement + '";'
        
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
                let listParticipants = [];
                //Attendre la réponse pour toutes les lignes existantes
                const custPromListe = new Promise((resolve, reject) => {
                    //Pour chaque ligne récupérer le nombre de participants
                    rows.forEach( async (row, index, array) => {
                        //Creation de l'objet participant
                        part = new Participant(row.nom, row.prenom, row.mail, row.numeroTelephone); 
                        listParticipants.push(part) ; 
                        //Une fois arrivé à la fin de la liste, renvoyer une réponse avec les participants pour chaque evenement
                        if (index === array.length - 1){
                            resolve(listParticipants);
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

// exportation des méthodes
exports.getParticipants = getParticipants; 