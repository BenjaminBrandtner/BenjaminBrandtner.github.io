document.addEventListener("DOMContentLoaded", function () {
	changeContent("landing");
	init();

});

//Global Variables
var contentOrder = new Array; 
var curPage;
var lastInputs = new Array;
var aniDuration = 1200; //in ms
var aniDelay = 0; //in ms

var originalBackgroundMain;
var originalBackgroundBody;
//Functions
function init() {
	var allContent = document.getElementsByClassName("content");
	for (var i = 0; i < allContent.length; i++) {
		contentOrder[i] = allContent[i].id;
	}
}
function initFlip(name) {
	/* Soll aus dem HTML-Dokument aufgerufen werden, beim Klicken eines Links. Der Name des gewünschten Inhalts (identisch mit der ID des passenden main-Blockes) muss übergeben werden */
	if (document.getElementById("display").className == "aniFlip" || document.getElementById("display").className == "aniFlipH") {
		//Animation in progress, don't do anything
	}
	else {
		document.getElementById("display").className = "aniFlip";
		document.getElementById("cardshadow").className = "aniShadowFlip";
		setTimeout(function () { changeContent(name); }, aniDuration / 2 + aniDelay);
		setTimeout(removeFlip, aniDuration + aniDelay);
	}
}

function initFlipH(direction) {
	/* Wird durch die Navigationssymbole aufgerufen, schreitet durch die verschiedenen Inhalte in der Reihenfolge in der sie im HTML-Code kommen */
	if (document.getElementById("display").className == "aniFlip" || document.getElementById("display").className == "aniFlipH") {
		//Animation in progress, don't do anything
	}
	else {
		cheatcode(direction);
		//Retrieve index of previous page
		var newPageIndex;
		for (i = 0; i < contentOrder.length; i++) {
			if (contentOrder[i] == curPage) {
				newPageIndex = i;
			}
		}
		//Decide new page based on direction, loop around if on the edges
		if (direction == -1) {
			if (newPageIndex == 0) {
				newPageIndex = contentOrder.length - 1;
			}
			else {
				newPageIndex--;
			}
		}
		else if (direction == 0) {
			newPageIndex = 0;
		}
		else if (direction == 1) {
			if (newPageIndex == contentOrder.length - 1) {
				newPageIndex = 0;
			}
			else {
				newPageIndex++;
			}
		}
		var newPage = contentOrder[newPageIndex];

		//Actual Flipping and content change
		document.getElementById("display").className = "aniFlipH";
		document.getElementById("cardshadow").className = "aniShadowFlipH";
		setTimeout(function () { changeContent(newPage); }, aniDuration / 2 + aniDelay);
		setTimeout(removeFlip, aniDuration + aniDelay);
	}
}

function removeFlip() {
	document.getElementById("display").className = "";
	document.getElementById("cardshadow").className = "";
}

function changeContent(name) {
	curPage=name;
	console.log(name + " wird aufgerufen");
	document.getElementById("content").innerHTML = document.getElementById(name).innerHTML;
}

function cheatcode(direction) {
	lastInputs.push(direction);
	lastInputsStr=lastInputs.toString();
	
	if (lastInputsStr.includes("-1,1,-1,1")) {
		console.log("Success!");
		lastInputs.splice(0,lastInputs.length);

		document.getElementById("navHome").setAttribute("href", "javascript:easteregg()")
	}
}

function easteregg() {
	initFlip("easteregg");
	document.getElementById("navHome").setAttribute("href", "javascript:endEasteregg()")

	originalBackgroundMain=document.getElementsByTagName('main')[0].style.backgroundImage;
	originalBackgroundBody=document.getElementsByTagName('body')[0].style.backgroundImage;

	document.getElementsByTagName('main')[0].style.backgroundImage = "URL(../css/rainbow.gif)";
	document.getElementsByTagName('body')[0].style.backgroundImage = "URL(../css/rainbow.gif)";
}

function endEasteregg() {
	initFlip("landing");
	document.getElementsByTagName('body')[0].style.backgroundImage = originalBackgroundBody;
	document.getElementsByTagName('main')[0].style.backgroundImage = originalBackgroundMain;
	document.getElementById("navHome").setAttribute("href", "javascript:initFlip('landing')");
}