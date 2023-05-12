var express = require('express');
var bodyparser = require('body-parser');
var metierEvenement = require('./metierEvenement');
var metierParticipant = require('./metierParticipants');

var app = express();
app.use(bodyparser.json());


//Ajout pour permettre la liaison avec le projet Angular
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//API REST
//PARTIE EVENEMENT---------------------------------------

//ajouter evenement (POST)
app.post('/evenement/ajouter', async function (req, res) {
  //Récuperer les paramètres
  var evenement = req.body;

  //Metier
  console.log("Metier");
  try {
    var objRes = await metierEvenement.ajouterEvenement(evenement);
    //Forger le résultat
    res.status(200).json(objRes);
  }

  catch (error) {
    res.status(404).json("ERR");
  }
});

//Supprimer un evenement (DELETE)
app.delete('/evenement/supprimer/:acronymeEvent', async function (req, res) {
  //Récuperer les paramètres
  var acronymeEvenement = req.params.acronymeEvent;

  //Effectuer le metier
  console.log("Metier");
  try {
    var objRes = await metierEvenement.supprimerEvenement(acronymeEvenement);
    //Forger le résultat
    res.status(200).json(objRes);
  }
  catch (error) {
    res.status(404).json("ERR");
  }

});


//lister tout les evenements (GET)
//Version sans chaîne de promise "faux asynchrone" 
app.get('/evenement/lister', async function (req, res) {
  res.status(200).json(await metierEvenement.getEvenements());
});

//Lister les evenements actifs (GET)
app.get('/evenement/lister/actifs', async function (req, res) {
  res.status(200).json(await metierEvenement.getEvenementsCourants())
});

//Lister les details d'un evenement (GET)
app.get('/evenement/details/:acronymeEvent', async function (req, res) {
  var acronyme = req.params.acronymeEvent;
  res.status(200).json(await metierEvenement.getInformationsEvenement(acronyme));
});

//Compter tout les evenements
app.get('/evenement/lister/all', async function (req, res) {
  res.status(200).json(await metierEvenement.getNbEvenements());
});


//PARTIE PARTICIPANTS---------------------------------------

//Lister les participants d'un évènement (GET)
app.get('/personne/:acronymeEvenement/lister', async function (req, res) {
  res.status(200).json(await metierParticipant.getParticipants(req.params.acronymeEvenement));
});

//Ajouter un participant (POST)
app.post('/personne/ajouter', async function (req, res) {
  //Récuperer les paramètres
  var participant = req.body[1];
  var acronymeE = req.body[0];
  //Metier
  console.log("Metier");
  try {
    var objRes = await metierParticipant.ajouterParticipant(acronymeE, participant);
    //Forger le résultat
    res.status(200).json(objRes);
  }
  catch (error) {
    res.status(404).json("ERR");
  }
});

//Calculer la moyenne des participants par evenements
app.get('/participants/moyenne', async function (req, res) {
  res.status(200).json(await metierParticipant.moyenneParticipants());
});



//Demarrage du serveur sur le port 3000
app.listen(3000, function () {
  console.log('Server running');
}); 