let socket = io();

$(document).ready(function(){
	$("#choice1").hide();
	$("#choice2").hide();
})


/*socket.on('newVote', function(){

})*/

$("#choice1").click(function(){
	socket.emit('vote1');
	$("#choice1").hide();
	$("#choice2").hide();
});
$("#choice2").click(function(){
	socket.emit('vote2');
	$("#choice1").hide();
	$("#choice2").hide();
});

$("#sendChat").click(function(){
	socket.emit('newMessage', $("#chatBox").val(), "anon");
	$("#chatBox").val('');
})

socket.on('pushChoices', function(ch1, ch2){
	$("#choice1").html(ch1);
	$("#choice2").html(ch2);
	$("#choice1").show();
	$("#choice2").show();
});