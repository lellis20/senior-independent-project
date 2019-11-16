//Full screen bookmarklet: javascript:document.body.webkitRequestFullScreen();

let socket = io();

$(document).ready(function(){
	$(".resultBubble").hide();
})

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

socket.on('publishResults', function(p1, p2, p3){
	if (p3 == 0) {
		$("#publish1").show();
		$("#publish2").show();
		var p1config = liquidFillGaugeDefaultSettings();
		p1config.circleColor = "#FF0000";
		p1config.waveColor = "#FF0000";
		p1config.textColor = "#FFF33C";
		p1config.circleThickness = 0.2;
		p1config.textVertPosition = 0.2;
		p1config.waveAnimateTime = 1000;
		var person1 = loadLiquidFillGauge("publish1", p1, p1config);

		var p2config = liquidFillGaugeDefaultSettings();
		p2config.circleColor = "#FF0000";
		p2config.waveColor = "#FF0000";
		p2config.textColor = "#FFF33C";
		p2config.circleThickness = 0.2;
		p2config.textVertPosition = 0.2;
		p2config.waveAnimateTime = 980;
		var person2 = loadLiquidFillGauge("publish2", p2, p2config);
	}
	else {
		$(".resultBubble").show();
		var p1config = liquidFillGaugeDefaultSettings();
		p1config.circleColor = "#FF0000";
		p1config.waveColor = "#FF0000";
		p1config.textColor = "#FFF33C";
		p1config.circleThickness = 0.2;
		p1config.textVertPosition = 0.2;
		p1config.waveAnimateTime = 1000;
		var person1 = loadLiquidFillGauge("publish1", p1, p1config);
		
		var p2config = liquidFillGaugeDefaultSettings();
		p2config.circleColor = "#FF0000";
		p2config.waveColor = "#FF0000";
		p2config.textColor = "#FFF33C";
		p2config.circleThickness = 0.2;
		p2config.textVertPosition = 0.2;
		p2config.waveAnimateTime = 980;
		var person2 = loadLiquidFillGauge("publish2", p2, p2config);

		var p3config = liquidFillGaugeDefaultSettings();
		p3config.circleColor = "#FF0000";
		p3config.waveColor = "#FF0000";
		p3config.textColor = "#FFF33C";
		p3config.circleThickness = 0.2;
		p3config.textVertPosition = 0.2;
		p3config.waveAnimateTime = 960;
		var person3 = loadLiquidFillGauge("publish3", p3, p3config);
	}
	
	
})
socket.on('hideResults', function(){
	$(".resultBubble").hide();
})

