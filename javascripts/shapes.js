$(document).ready(function() {
	var square = new Square();
	setInterval(function() {
		displaySquare(square);
	}, 10);
});

var random = function(range) {
	return Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
};

var displaySquare = function(square) {
	// $('body').css('background-color', square.background);
	square.reset();
	var $square = $('#square');
	$square.css('width', square.width);
	$square.css('height', square.height);
	$square.css('background-color', square.color);
	$square.css('margin-left', square.xOffset);
	$square.css('margin-top', square.yOffset);
	// console.log(square.xOffset);
};

var Square = function() {
	var maxWidth = $(document).width();
	var maxHeight = $(document).height();
	var counter = 0;
	var increment = function() {
		return (counter += 1) % 4;
	};
	return {
		background: 'black',
		width: 200,
		height: 200,
		color: 'black',
		x: 0,
		y: 0,
		xOffset: 0,
		yOffset: 0,
		reset: function() {
			this.background = this.background === 'white' ? 'black' : 'white';
			this.width = random([maxWidth * 0.6, maxWidth * 0.85]);
			this.height = random([maxHeight * 0.6, maxHeight * 0.85]);
			// this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
			// var xOffset, yOffset;
			switch(increment())
			{
			case 0:
				this.xOffset = 0;
				this.yOffset = 0;
				break;
			case 1:
				this.xOffset = maxWidth - this.width;
				this.yOffset = 0;
				break;
			case 2:
				this.xOffset = 0;
				this.yOffset = maxHeight - this.height;
				break;
			case 3:
				this.xOffset = maxWidth - this.width;
				this.yOffset = maxHeight - this.height;
				break;
			default:
			}
		}

	};
};