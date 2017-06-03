//Création des variables utile à l'application
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    fs = require('fs');


// Redirection vers la page index
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
