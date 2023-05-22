//Partie Metier
var sqlite3 = require('sqlite3');

// Constructeur model Administrateur
function Administrateur(plogin, pmdp) {
    this.login = plogin;
    this.mdp = pmdp;
}

// Méthodes métier

function authenticateAdmin(plogin, pmdp) {
    
    //Mise en place de la promise
    const custProm = new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Administrateur ad WHERE ad.login = ? AND ad.mdp = ?'
        
        //ouverture de la connexion
        let db = new sqlite3.Database('database/databaseProject.db', err => {
            if (err) {
                reject(err);
            }
            console.log('ouverture BDD authenticateAdmin');
        });

        db.all(sql, [plogin, pmdp], (err, rows) => {
            if (err) {
                reject(err);
                db.close();  
            }
            else {
                let listAuthentifies = [];

                //Attendre la réponse pour toutes les lignes existantes
                const custPromListe = new Promise((resolve, reject) => {
                    
                    if(rows.length == 1) {
                        console.log('login et mdp valide')
                        //Pour chaque ligne récupérer l'ensemble des authentifiés
                        part = new Administrateur(rows[0].login, rows[0].mdp);
                        
                        resolve(part);
                    }
                    else {
                        console.log('login ou mdp invalide (ou trop de rows récupérées)'); 
                        resolve(listAuthentifies); 
                    }
                });

                //Si on a recuperer tout les participants , renvoyer la réponse (liste) récupérée
                custPromListe.then(function(){
                    console.log('FIN');
                    db.close();  
                    resolve(custPromListe);
                });
            }
        });
    });
    return custProm;
}

// exportation des méthodes
exports.authenticateAdmin = authenticateAdmin;