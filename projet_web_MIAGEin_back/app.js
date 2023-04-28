var express = require('express');
var bodyparser = require('body-parser');
var metier = require('./metierApplication') ; 

var app = express() ; 
app.use(bodyparser.json());



//Version avec chaîne de promise

app.get('/root', function(req, res) {
  //res.send('Ca marche') ; *
  //Retour une Promise 
  metier.getEvenement(req).then(
    V => res.send(V)
  )
  .catch(  err => { console.log(err); } );
  //s'execute même sans la fin du getEvenement, continuation de l'event loop, ne connais pas le résultat de l'appel au-dessus
  console.log("Preuve de l'event loop");
});


//Version sans chaîne de promise "faux asynchrone"

app.get('/', async function(req, res) {
  //res.send('Ca marche') ; *
  //Retour une Promise 
  let mario = await metier.getEvenement(req)
  console.log(mario);
  res.send(mario);
}); 


app.listen(3000, function() {
  console.log('Server running') ; 
}) ; 
