$(document).ready(function() {
	var toggle = changeBackground();
	var interval = Math.floor(Math.random() * 20) + 20;
	console.log(interval);
	setInterval(toggle, interval );
});

var changeBackground = function() {
	var background = "white";
	return function() {
		background = (background === "white") ? "black" : "white";
		$('body').css('background-color', background);
	};
};