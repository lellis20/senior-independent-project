const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const pathPublic = path.join(__dirname, '/public');

var app = express();
let server = http.createServer(app);
let io = socketio(server);

var currentViewers = 0;
//Voting Variables here
var ch1Votes = 0;
var ch2Votes = 0;


app.use(express.static(pathPublic));

io.on('connection', function(socket) {
	console.log("new user connected");
	//currentViewers++;
	// socket.emit('screenSend');
	socket.on('sendThing', function(msg){
		console.log("message: " + msg);
		socket.broadcast.emit("screenSend", msg);
		console.log("sent to screen");
	});
	socket.on('questionToggle', function(){
		socket.broadcast.emit('qToggle');	
	});


	socket.on('sendChoices', function(ch1, ch2){
		console.log("Audience choices: " + ch1 + " or " + ch2);
		socket.broadcast.emit('pushChoices', ch1, ch2);
		ch1Votes = 0;
		ch2Votes = 0;
		console.log("vote1: " + ch1Votes + " | vote2: " + ch2Votes);
	});
	// Vote counters
	socket.on('vote1', function(){
		ch1Votes++;
		socket.broadcast.emit('vCounter1', ch1Votes);
	});
	socket.on('vote2', function(){
		ch2Votes++;
		socket.broadcast.emit('vCounter2', ch2Votes);
	});


	// Chat facilitation
	socket.on('newMessage', function(msg, who){
			socket.broadcast.emit('pushMessage', msg, who);
			console.log("CHAT: " + who + ": " + msg);
	});
});


server.listen(5000, function() {
	console.log("server running on port 5000");
});

