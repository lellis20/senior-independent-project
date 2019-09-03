$(document).ready(function() {
	var socket = io.connect('localhost:5000');
	socket.on('connect', function() {
		socket.send('User has connected!');
	});
	socket.on('message', function(msg) {
		$("#messageBox").append('<li>'+msg+'</li>');
		console.log('Received message');
	});
	$('#sendButton').on('click', function() {
		socket.send($('#message').val());
		$('#message').val('');
	});
});