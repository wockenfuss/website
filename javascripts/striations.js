$(document).ready(function() {
    // console.log(hslColor);
    // var rgbColor = hslToRgb(hslColor);
    // console.log(rgbColor);
    // console.log(newRGB());

    var myRgb = newRGB();//[255, 104, 104]; //
    var complementary = compColor(myRgb);

    console.log(myRgb);
    console.log(complementary);

    $(document).on('keypress', function(e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 32) {
            $('div').stop(true);
            $('body').children().remove();
            setup();
        }
    });

    setup();
});

var setup = function() {
    var mode = Math.floor(Math.random() * 2);

    var totalLines, numLines, cssProperty, thickness = Math.floor(Math.random() * 5) + 1;

    if ( mode === 0 ) {
        numLines = $(window).height();
        cssProperty = 'min-height';
    } else {
        numLines = $(window).width();
        cssProperty = 'min-width';
    }

    totalLines =  numLines / thickness;
    
    for ( var i = 0; i < totalLines; i++ ) {
        var div = $(document.createElement('div'));
        $('body').append(div);
    }

    $('div').css(cssProperty, thickness + 'px');

    if ( mode !== 0 ) {
        $('div').css('min-height', $(window).height() + 'px');
        $('div').css('float', 'left');
    }
    $.each($('div'), function() {
        changeColor(this);
    });
};

var changeColor = function(element) {
    $(element).animate( {backgroundColor: newColor()}, randDuration(), 'linear', function() {
        changeColor(this);
    });
};

var newColor = function() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
};

var rand16 = function() {
    return Math.floor(Math.random() * 16).toString(16);
};

var randDuration = function() {
    return Math.floor(Math.random() * 5000) + 5000;
};

