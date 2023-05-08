var express = require('express');
var bodyparser = require('body-parser');
var metierEvenement = require('./metierEvenement') ; 
var metierParticipant = require('./metierParticipants');

var app = express() ; 
app.use(bodyparser.json());


//Ajout pour permettre la liaison avec le projet Angular
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
  next(); 
}); 

//API REST

//ajouter evenement (POST)
app.post('/evenement/ajouter', async function(req, res) {
  //Récuperer les paramètres
  var evenement = req.body ; 

  //Metier
  console.log("Metier") ; 
  try {
    var objRes = await metierEvenement.ajouterEvenement(evenement) ; 
    //Forger le résultat
    res.status(200).json(objRes) ; 
  }
  catch (error) {
    console.log(error) ; 
    //res.status(200).json("Erreur lors de l'insertion") ; 
  }
}); 

//lister tout les evenements (GET)
//Version sans chaîne de promise "faux asynchrone"
app.get('/', async function(req, res) { 
  res.status(200).json(await metierEvenement.getEvenements()) ; 
}); 

//Supprimer un evenement (DELETE)

//lister tout les evenements (GET) => ok
//Version sans chaîne de promise "faux asynchrone" 
app.get('/evenement/lister', async function(req, res) { 
  res.status(200).json(await metierEvenement.getEvenements()) ; 
});

//Lister les evenements actifs (GET)
app.get('/evenement/lister/actifs', async function(req, res) {
  res.status(200).json(await metierEvenement.getEvenementsCourants())
})

//Lister les details d'un evenement (GET)
app.get('/evenement/details/:acronymeEvent', async function(req, res) {
  var acronyme = req.params.acronymeEvent ;
  res.status(200).json(await metierEvenement.getInformationsEvenement(acronyme)) ; 
})

//Afficher les personnes d'un évènement (GET)
app.get('/personne/:acronymeEvenement/lister', async function(req, res) {
  res.status(200).json(await metierParticipant.getParticipants(req.params.acronymeEvenement));
});

//Ajouter une personne (POST)

//Demarrage du serveur sur le port 3000
app.listen(3000, function() {
  console.log('Server running'); 
}); 
