//Full screen bookmarklet: javascript:document.body.webkitRequestFullScreen();

let socket = io();

var waveColorVal = "#9C0101";
var updateStats = false;
var viewerStart = 14000;

var stalkerLinks = ["", // Default
					"https://media.giphy.com/media/gHbjrjwDA20z7MWarn/giphy.gif", // TheoMain YuiATM
					"https://media.giphy.com/media/St9Gty9yIA8HEbbgZ0/giphy.gif", // BenMain
					"blank", // SamMain
					"https://media.giphy.com/media/jpuay2nynuLgBXr1Nb/giphy.gif", // MaryMain
					"https://media.giphy.com/media/XGVdSMd5SbhLNcVUHC/giphy.gif" //CalvinMain
					]

function spoofIP(){
	var val1 = Math.floor(Math.random() * 100) + 10;
	var val2 = Math.floor(Math.random() * 1000) + 100;
	var val3 = Math.floor(Math.random() * 1000) + 100;
	var val4 = Math.floor(Math.random() * 1000) + 100;
	$("#spoofedIP").html("IP: " + val1 + "." + val2 + "." + val3 + "." + val4);
	var lat1 = Math.floor(Math.random() * 181) - 90;
	var lat2 = Math.floor(Math.random() * 10000);
	var long1 = Math.floor(Math.random() * 261) - 180;
	var long2 = Math.floor(Math.random() * 10000);
	$("#spoofedLoc").html("Lat: " + lat1 + "." + lat2 + "  Long: " + long1 + "." + long2);
};
function ping(){
	var curPing = Math.floor(Math.random() * 61) + 40;
	$("#pingBox").html("Server Ping: " + curPing);
};
function viewers(){
	var changes = Math.floor(Math.random() * 20) - 7;
	viewerStart += changes;
	$("#viewerBox").html("Online Viewers: " + viewerStart);
};

$(document).ready(function(){
	$(".resultBubble").hide();
	$(".resultBox").hide();
	$("#header1").hide();
	// Timer for "spoofing" IP and location
	setInterval(function(){
		spoofIP();
	}, 5000);
	setInterval(function(){
		ping();
	}, 3243);
	setInterval(function(){
		viewers();
	}, 4354);
});


function streamEvent(){
	console.log("Stream event posted");
};



socket.on('connection', function(){
	console.log("connected to server");
});

socket.on('screenSend', function(msg){
	$("#header2").html(msg);
	$("#header1").show();
	spoofIP();
});

socket.on('qToggle', function(){
	$("#header1").slideToggle();
});

socket.on('pushMessage', function(msg, who) {
	var numChild = $("#chat").children();
	if (numChild.length >= 5){
		numChild.first().remove();
	}
	$("#chat").append("<li class=" + who + ">" + "<mark class=" + who + "marked>" + who + ":</mark> " + msg + "</li>");
});

socket.on('runStreamEvents', function(){
	streamEventStatus = true;
});
socket.on('stopStreamEvents', function(){
	streamEventStatus = false;
});

socket.on('viewerUpdate', function(num){
	$("#curViews").html("Players: " + num);
});

socket.on('publishResults', function(p1, p2, p3, ch1, ch2, ch3){
	if (p3 == 0) {
		$("#header2").html("");
		$(".resultBubble").html("");
		$("#result1").html(ch1);
		$("#result2").html(ch2);
		$(".resultBox").attr("class", "resultBox six columns");
		//$("#result2").attr("class", "resultBox six columns");
		$("#result1").show();
		$("#result2").show();
		$("#publish1").attr("class", "resultBubble six columns");
		$("#publish2").attr("class", "resultBubble six columns");
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
		$("#header2").html("");
		$(".resultBubble").html("");
		$("#result1").html(ch1);
		$("#result2").html(ch2);
		$("#result3").html(ch3);
		$(".resultBox").attr("class", "resultBox four columns");
		//$("#result2").attr("class", "resultBox four columns");
		//$("#result3").attr("class", "resultBox four columns");
		$(".resultBubble").attr("class", "resultBubble four columns");
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
	$("#header1").slideToggle();
});

socket.on('stalkerPush', function(imgNum){
	$(".stalkerBox").attr("src", stalkerLinks[imgNum])
});


