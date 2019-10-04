let socket = io();

socket.on('connection', function(){
	console.log("You have connected!");
});

socket.on('wowee', function(){
	alert("i just got something funny");
})

// send question
$("#firstButton").click(function(){
	socket.emit('sendThing', $("#question").val());
	$("#question").val('');
});

// toggle view of question on screen
$("#questionToggle").click(function(){
	socket.emit('questionToggle');
});

// Mod Chat
$("#modSend").click(function(){
	socket.emit('newMessage', $("#modChat").val(), "MOD");
	$("#modChat").val('');
});


// Voting
$("#sendChoices").click(function(){
	name1 = $("#choice1").val();
	name2 = $("#choice2").val();
	socket.emit('sendChoices', name1, name2);
	$("#choice1").val('');
	$("#choice2").val('');
	$("#name1").html(name1 + ": ");
	$("#name2").html(name2 + ": ");
	$("#ch1Votes").html("0");
	$("#ch2Votes").html("0");
});

socket.on('vCounter1', function(ch1Votes){
	$("#ch1Votes").html(ch1Votes);
});
socket.on('vCounter2', function(ch2Votes){
	$("#ch2Votes").html(ch2Votes);
});