//Full screen bookmarklet: javascript:document.body.webkitRequestFullScreen();

let socket = io();

var waveColorVal = "#9C0101";

var stalkerLinks = ["", // Default
					"https://media.giphy.com/media/gHbjrjwDA20z7MWarn/giphy.gif", // TheoMain YuiATM
					"https://media.giphy.com/media/St9Gty9yIA8HEbbgZ0/giphy.gif", // BenMain
					"blank", // SamMain
					"https://media.giphy.com/media/jpuay2nynuLgBXr1Nb/giphy.gif", // MaryMain
					"https://media.giphy.com/media/XGVdSMd5SbhLNcVUHC/giphy.gif" //CalvinMain
					]

$(document).ready(function(){
	$(".resultBubble").hide();
	$(".resultBox").hide();
});

socket.on('connection', function(){
	console.log("connected to server");
});

socket.on('screenSend', function(msg){
	$("#header2").html(msg);
	$("#header1").show();
});

socket.on('qToggle', function(){
	$("#header1").slideToggle();
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
});

socket.on('publishResults', function(p1, p2, p3, ch1, ch2, ch3){
	if (p3 == 0) {
		$(".resultBubble").html("");
		$("#result1").html(ch1);
		$("#result2").html(ch2);
		$("#result1").attr("class", "resultBox six columns");
		$("#result2").attr("class", "resultBox six columns");
		$("#result1").show();
		$("#result2").show();
		$("#publish1").show();
		$("#publish2").show();
		var p1config = liquidFillGaugeDefaultSettings();
		p1config.circleColor = "#FF0000";
		p1config.waveColor = waveColorVal;
		p1config.textColor = "#FFF33C";
		p1config.circleThickness = 0.2;
		p1config.textVertPosition = 0.2;
		p1config.waveAnimateTime = 1000;
		var person1 = loadLiquidFillGauge("publish1", p1, p1config);

		var p2config = liquidFillGaugeDefaultSettings();
		p2config.circleColor = "#FF0000";
		p2config.waveColor = waveColorVal;
		p2config.textColor = "#FFF33C";
		p2config.circleThickness = 0.2;
		p2config.textVertPosition = 0.2;
		p2config.waveAnimateTime = 980;
		var person2 = loadLiquidFillGauge("publish2", p2, p2config);
	}
	else {
		$(".resultBubble").html("");
		$("#result1").html(ch1);
		$("#result2").html(ch2);
		$("#result3").html(ch3);
		$("#result1").attr("class", "resultBox four columns");
		$("#result2").attr("class", "resultBox four columns");
		$("#result3").attr("class", "resultBox four columns");
		$(".resultBox").show();
		$(".resultBubble").show();
		var p1config = liquidFillGaugeDefaultSettings();
		p1config.circleColor = "#FF0000";
		p1config.waveColor = waveColorVal;
		p1config.textColor = "#FFF33C";
		p1config.circleThickness = 0.2;
		p1config.textVertPosition = 0.2;
		p1config.waveAnimateTime = 1000;
		var person1 = loadLiquidFillGauge("publish1", p1, p1config);
		
		var p2config = liquidFillGaugeDefaultSettings();
		p2config.circleColor = "#FF0000";
		p2config.waveColor = waveColorVal;
		p2config.textColor = "#FFF33C";
		p2config.circleThickness = 0.2;
		p2config.textVertPosition = 0.2;
		p2config.waveAnimateTime = 980;
		var person2 = loadLiquidFillGauge("publish2", p2, p2config);

		var p3config = liquidFillGaugeDefaultSettings();
		p3config.circleColor = "#FF0000";
		p3config.waveColor = waveColorVal;
		p3config.textColor = "#FFF33C";
		p3config.circleThickness = 0.2;
		p3config.textVertPosition = 0.2;
		p3config.waveAnimateTime = 960;
		var person3 = loadLiquidFillGauge("publish3", p3, p3config);
	}
});
socket.on('hideResultCommand', function(){
	$(".resultBubble").hide();
	$(".resultBox").hide();
	$(".resultBox").html("");
});

socket.on('stalkerPush', function(imgNum){
	$(".stalkerBox").attr("src", stalkerLinks[imgNum])
});

