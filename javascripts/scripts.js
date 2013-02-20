$(document).ready(function() {
	loadLatestTweet();
    $mainContent = $('#mainContent');
    addHover('#projects');

    $('#projects').on('click', function(e) {
        e.preventDefault();
        $(this).off('hover');
        displayCategories(e);
        $(this).children().first().removeClass('trans75');
        $(this).off('click');
        $(this).on('click', function(e) {
            e.preventDefault();
        });
        // return false;
    });



    // $('.scrollPage').on('click', function() {
    //     // var elementClicked = $(this).attr("href");
    //     // var destination = $(elementClicked).offset().top;
    //     // $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-20}, 500 );

    //     $("#gifImage").animate({ top: $('footer').offset().top }, 1000);
    //     return false;
    // });

});

function addHover(element, ignore) {
    $(element).children().addClass('trans75');
    $(element).on('hover', function(e) {
        $(this).children().toggleClass('trans75');
    })
    .on('click', function(e) {
        nextStep(e);
        return false;
    });
    $(ignore).off('hover')
        .off('click')
        .children().removeClass('trans75');
}

// function enableProjectListeners() {
//     $('#mainContent a').on('hover', function(e) {
//         $(e.target).parent().siblings().removeClass('invisible');
//     });
// }

var displayCategories = function(e) {
    $('#gifImage').fadeOut('slow', function() {
        elementFade('#web');
    });
    var $links = $('.subnav');
    $links.parent().removeClass('invisible');
    addHover($links, $links.last());
};

var nextStep = function(e) {
    var $outFade = $('.list:visible');
    var $inFade = e.target.getAttribute('data-value');
    if ( $outFade ) {
        $outFade.fadeOut('fast', function() {
            elementFade($inFade);
        });
        addHover($('.subnav'), e.target.parentElement);
    }
};

function elementFade(element) {
    var $element = $(element);
    if ( $element.hasClass('invisible')) {
        $element.fadeIn('fast');
    } else {
        $element.fadeOut('fast');
    }
}

String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, "");
};

function loadLatestTweet(){
    var _url = 'https://api.twitter.com/1/statuses/user_timeline/horse_ebooks.json?callback=?&count=1';
    $.getJSON(_url,function(data){
        var tweet = data[0].text.parseURL();
        $('#twitter-feed').html('<p>'+tweet+'</p>');
    });
}