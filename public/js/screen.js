//Full screen bookmarklet: javascript:document.body.webkitRequestFullScreen();

let socket = io();


socket.on('connection', function(){
	console.log("connected to server");
});

socket.on('screenSend', function(msg){
	$("#header1").html(msg);
	$("#header1").show();
});

socket.on('qToggle', function(){
	$("#header1").toggle();
});

socket.on('pushMessage', function(msg, who) {
	var numChild = $("#chat").children();
	if (numChild.length >= 5){
		numChild.first().remove();
	}
	$("#chat").append("<li>" + who + ": " + msg + "</li>");
});

socket.on('viewerUpdate', function(num){
	$("#curViews").html(num);
})

