document.addEventListener("DOMContentLoaded", function () {
	init();

});

//Global Variables
var curPage;
var contentOrder = new Array; 
var lastInputs = new Array;

//Animation Timings, as defined in css
var aniDuration = 1200; //in ms
var aniDelay = 0; //in ms

//needed when Easteregg is activated
var originalBackgroundMain;
var originalBackgroundBody;

//Functions
function init() {
	changeContent("landing");
	var allContent = document.getElementsByClassName("content");
	for (var i = 0; i < allContent.length; i++) {
		contentOrder[i] = allContent[i].id;
	}

	document.addEventListener("keydown", function (e) {
		evaluateKeypress(e.key);
	});
}

function initFlip(dest) {
	/* Soll aus dem HTML-Dokument aufgerufen werden, beim Klicken eines Links. Der Name des gewünschten Inhalts (=ID des gewünschten div.content-Blocks) muss übergeben werden */
	if (document.getElementById("display").className == "aniFlip" || document.getElementById("display").className == "aniFlipH") {
		//Animation in progress, don't do anything
	}
	else {
		document.getElementById("display").className = "aniFlip";
		document.getElementById("cardshadow").className = "aniShadowFlip";
		setTimeout(function () { changeContent(dest); }, aniDuration / 2 + aniDelay);
		setTimeout(removeFlip, aniDuration + aniDelay);
	}
}

function initFlipH(direction) {
	/* Wird durch die Navigationssymbole aufgerufen, schreitet durch die verschiedenen Inhalte in der Reihenfolge in der sie im HTML-Code kommen */
	if (document.getElementById("display").className == "aniFlip" || document.getElementById("display").className == "aniFlipH") {
		//Animation in progress, don't do anything
	}
	else {
		checkCheatcode(direction);

		//Retrieve index of previous page
		var destIndex;
		for (i = 0; i < contentOrder.length; i++) {
			if (contentOrder[i] == curPage) {
				destIndex = i;
			}
		}
		//Decide new page based on direction, loop around if on the edges
		if (direction == -1) {
			if (destIndex == 0) {
				destIndex = contentOrder.length - 1;
			}
			else {
				destIndex--;
			}
		}
		else if (direction == 0) {
			destIndex = 0;
		}
		else if (direction == 1) {
			if (destIndex == contentOrder.length - 1) {
				destIndex = 0;
			}
			else {
				destIndex++;
			}
		}
		var dest = contentOrder[destIndex];

		//Actual Flipping and content change
		document.getElementById("display").className = "aniFlipH";
		document.getElementById("cardshadow").className = "aniShadowFlipH";
		setTimeout(function () { changeContent(dest); }, aniDuration / 2 + aniDelay);
		setTimeout(removeFlip, aniDuration + aniDelay);
	}
}

function removeFlip() {
	document.getElementById("display").className = "";
	document.getElementById("cardshadow").className = "";
}

function changeContent(dest) {
	curPage=dest;
	document.getElementById("content").innerHTML = document.getElementById(dest).innerHTML;
}

function evaluateKeypress(key) {
	if (document.getElementById("display").className == "aniFlip" || document.getElementById("display").className == "aniFlipH") {
		//Animation in progress, don't do anything
	}
	else if(key=="ArrowRight")
	{
		document.getElementById("navRight").focus();
		window.setTimeout(()=>{document.getElementById("navRight").click()},100);
	}
	else if(key=="ArrowLeft")
	{
		document.getElementById("navLeft").focus();
		window.setTimeout(()=>{document.getElementById("navLeft").click()},100);
	}
	else if(key=="ArrowDown")
	{
			$.tabNext();
			//In Chrome after pressing a link with the mouse the focus function is unreliable at putting an outline at the focused element. So in the css I disabled outlines permanently and change the text color instead.
	}
	else if(key=="ArrowUp")
	{
			$.tabPrev();
	}
	
}

function checkCheatcode(direction) {
	lastInputs.push(direction);
	lastInputsStr=lastInputs.toString();
	
	if (lastInputsStr.includes("-1,1,-1,1")) {
		console.log("Success!");
		lastInputs.splice(0,lastInputs.length); //clear the array

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