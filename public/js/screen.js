let socket = io();

socket.on('connection', function(){
	console.log("connected to server");
});

socket.on('screenSend', function(){
	alert("received!");
	socket.emit('tired');
});
