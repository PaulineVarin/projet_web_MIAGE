var express = require('express');
var bodyparser = require('body-parser');
var metier = require('./metierApplication') ; 

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

//lister les evemenements (tous)
//Version sans chaîne de promise "faux asynchrone"
app.get('/', async function(req, res) {
  res.status(200).json(await metier.getEvenement()) ; 
}); 

//Lister les evenements actifs (GET)

//Lister les details d'un evenement (GET)

//Afficher une personne (GET)

//Ajouter une personne (POST)

//Supprimer une personne dans un evenement (DELETE)

//Supprimer un evenement (DELETE)

//Demarrage du serveur sur le port 3000
app.listen(3000, function() {
  console.log('Server running') ; 
}) ; 
