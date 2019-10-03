const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const pathPublic = path.join(__dirname, '/../public');

var app = express();
let server = http.createServer(app);
let io = socketio(server);

app.use(express.static(pathPublic));

io.on('connection', function(socket) {
	console.log("new user connected");

	socket.on('sendThing', function(){
		console.log("I think it worked");
		socket.emit("screenSend");
		console.log("sent to screen");
	});
	socket.on('tired', function(){
		console.log("no way it worked");
	});
});

server.listen(5000, function() {
	console.log("server running on port 5000");
});

