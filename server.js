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
var ch3Votes = 0;

/*var choice1 = "";
var choice2 = "";
var choice3 = "";*/


app.use(express.static(pathPublic));

io.on('connection', function(socket) {
	console.log("new user connected");
	currentViewers++;
	console.log(currentViewers);
	socket.broadcast.emit('viewerUpdate', currentViewers);
	socket.on('sendThing', function(msg){
		console.log("message: " + msg);
		socket.broadcast.emit("screenSend", msg);
		console.log("sent to screen");
	});
	socket.on('questionToggle', function(){
		socket.broadcast.emit('qToggle');	
	});


	socket.on('sendChoices', function(ch1, ch2, ch3){
		/*choice1 = ch1;
		choice2 = ch2;
		choice3 = ch3;*/
		console.log("Audience choices: " + ch1 + " or " + ch2 + " or " + ch3);
		socket.broadcast.emit('pushChoices', ch1, ch2, ch3);
		ch1Votes = 0;
		ch2Votes = 0;
		ch3Votes = 0;
		// console.log("vote1: " + ch1Votes + " | vote2: " + ch2Votes);
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
	socket.on('vote3', function(){
		ch3Votes++;
		socket.broadcast.emit('vCounter3', ch3Votes);
	});


	// Chat facilitation
	socket.on('newMessage', function(msg, who){
			socket.broadcast.emit('pushMessage', msg, who);
			console.log("CHAT: " + who + ": " + msg);
	});


	socket.on('disconnect', function(){
		currentViewers--;
		console.log("user disconnected");
		console.log(currentViewers);
		socket.broadcast.emit('viewerUpdate', currentViewers);
	});
});


server.listen(8080, function() {
	console.log("server running on port 8080");
});

