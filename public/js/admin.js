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
$("#openPoll").click(function(){
	name1 = $("#choice1").val();
	name2 = $("#choice2").val();
	name3 = $("#choice3").val();
	socket.emit('sendChoices', name1, name2, name3);
	$("#choice1").val('');
	$("#choice2").val('');
	$("#choice3").val('');
	$("#name1").html(name1 + ": ");
	$("#name2").html(name2 + ": ");
	$("#name3").html(name3 + ": ");
	$("#ch1Votes").html("0");
	$("#ch2Votes").html("0");
	$("#ch3Votes").html("0");
});
$("#closePoll").click(function(){
	socket.emit('closePoll');
})
$("#showResults").click(function(){
	socket.emit('showResults');
})
$("#hideResults").click(function(){
	socket.emit('hideResults');
})

socket.on('vCounter1', function(ch1Votes){
	$("#ch1Votes").html(ch1Votes);
});
socket.on('vCounter2', function(ch2Votes){
	$("#ch2Votes").html(ch2Votes);
});
socket.on('vCounter3', function(ch3Votes){
	$("#ch3Votes").html(ch3Votes);
});

$("#submitStalker").click(function(){
	var toSend = $("#stalkerPicMenu").val();
	socket.emit('stalkerSend', toSend);
});

$("#hideStalker").click(function(){
	socket.emit('stalkerSend', 0);
})

