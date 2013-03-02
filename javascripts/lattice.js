$(document).ready(function() {
	var pageName = ($('head title').text());
	var currentInterval;
	$('body').css('margin', 0).css('padding', 0);

	$(document).on('keypress', function(e) {
		code = (e.keyCode ? e.keyCode : e.which);
		if (code === 32) {
			clearInterval(currentInterval);
			currentInterval = setup(pageName);
		}
	});

	currentInterval = setup(pageName);	
});

var frame = function(divisions, pageName) {
	var primaryColor = [255,255,255];
	var complementaryColor = [0,0,0];
	// var primaryColor = newRGB();
	// var complementaryColor = compColor(primaryColor);
	var switchCase;
	var height = $(window).height();
	var width = $(window).width();
	var divHeight = height / divisions;
	var divWidth = width / divisions;
	var counter = 0;
	var backgroundColor = {
		color: toRGB(primaryColor),
		toggle: function() {
			this.color = this.color === toRGB(primaryColor) ? toRGB(complementaryColor) : toRGB(primaryColor);
		}
	};

	if (pageName === "Lattice") {
		switchCase = function() {
			counter = (counter + 1) % 2;
			return counter;
		};
	} else {
		var number = Math.floor(Math.random() * 2);
		switchCase = function() {
			return number;
		};
	}

	return function() {
		var $divs = $('div');
		$divs.each(function() {
			backgroundColor.toggle();
			$(this).css('background-color', backgroundColor.color);
		});
		switch(switchCase()) {
		case 0://horizontal
			$('div').css('height', divHeight);
			$('div').css('width', width);
			if ( pageName === "Lattice" ) {
				backgroundColor.toggle();
			}
			break;
		case 1://vertical
			$('div').css('height', height);
			$('div').css('width', divWidth);
			break;
		}
	};
};

var setup = function(pageName) {
	var divisions = random([5, 35]);//set tiles to odd number
	if ( divisions % 2 === 0 ) {
		divisions += 1;
	}
//set up default css and html
	$('body').children().remove();
	for ( var i = 0; i < divisions; i++ ) {
		var div = $(document.createElement('div'));
		$('body').append(div);
	}
	$('div').css('float', 'left');
	var frameRate = random([30, 100]);
	var displayFrame = frame(divisions, pageName);

	var intervalId = setInterval(function() {
		displayFrame();
	}, frameRate );
	return intervalId;
};

var random = function(range) {
	return Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
};