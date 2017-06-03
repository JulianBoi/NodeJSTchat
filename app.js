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

//Connection au serveur
io.sockets.on('connection', function (socket, pseudo) {
    
    //Stockage du pseudo de notre client sur le serveur
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });
    //Quand on reçois un message on va directement renvoyé le pseudo avec
     socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
    
    
});
//Ecoute sur le port 8080
server.listen(8080);