$(document).ready(function() {
	var currentInterval, frameRate, toggle;

	$(document).on('keypress', function(e) {
		code = (e.keyCode ? e.keyCode : e.which);
		if (code === 32) {
			clearInterval(currentInterval);
			frameRate = Math.floor(Math.random() * 20) + 20;
			console.log(frameRate);
			currentInterval = setInterval(toggle, frameRate );
		}
	});

	toggle = changeBackground();
	frameRate = Math.floor(Math.random() * 20) + 20;
	console.log(frameRate);
	currentInterval = setInterval(toggle, frameRate );
});

var changeBackground = function() {
	var background = "white";
	return function() {
		background = (background === "white") ? "black" : "white";
		$('body').css('background-color', background);
	};
};