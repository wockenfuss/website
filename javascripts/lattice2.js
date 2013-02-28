$(document).ready(function() {
	var divisions = random([5, 35]);//set tiles to odd number
	if ( divisions % 2 === 0 ) {
		divisions += 1;
	}

//set up default css and html
	$('body').css('margin', 0).css('padding', 0);
	for ( var i = 0; i < divisions; i++ ) {
		var div = $(document.createElement('div'));
		$('body').append(div);
	}
	$('div').css('float', 'left');
	var frameRate = random([30, 100]);

	var displayFrame = frame(divisions);

	setInterval(function() {
		displayFrame();
	}, frameRate );
});

var frame = function(divisions) {
	var height = $(window).height();
	var width = $(window).width();
	var divHeight = height / divisions;
	var divWidth = width / divisions;
	var counter = 0;
	var backgroundColor = {
		color: 'white',
		toggle: function() {
			this.color = this.color === 'white' ? 'black' : 'white';
		}
	};

	var increment = function() {
		counter = (counter + 1) % 2;
		return counter;
	};

	return function() {
		var $divs = $('div');
		$divs.each(function() {
			backgroundColor.toggle();
			$(this).css('background-color', backgroundColor.color);
		});
		switch(increment()) {
		case 0://horizontal
			$('div').css('height', divHeight);
			$('div').css('width', width);
			backgroundColor.toggle();
			break;
		case 1://vertical
			$('div').css('height', height);
			$('div').css('width', divWidth);
			break;
		}
	};
};

var random = function(range) {
	return Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
};