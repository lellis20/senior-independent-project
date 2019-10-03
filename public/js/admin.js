let socket = io();

socket.on('connection', function(){
	console.log("You have connected!");
});

function send(){
	alert("sent");
	socket.emit('sendThing');
}