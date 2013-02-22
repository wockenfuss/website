$(document).ready(function() {
    var cookie = readCookie('visit');
    if ( cookie === "1" ) {
        var $button = $('#projects');
        var $links = $('.subnav');
        $links.parent().removeClass('invisible');
        setLinkState($links);
        $('#gifImage').css('display', 'none');
        elementFade('#film');
        $button.children().first().removeClass('trans75');
        $button.on('click', function(e) {
            e.preventDefault();
        });
    } else {
        firstVisit();
    }

});

var firstVisit = function() {
    loadLatestTweet();
    $target = $('#projects');
    $target.on('click', function(e) {
        e.preventDefault();
        setCookie('visit', '1');
        displayCategories(e);
        $(this).children().first().removeClass('trans75');
        $(this).off('click')
            .on('click', function(e) {
                e.preventDefault();
        });
    });
};

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function setCookie(name, value) {
    document.cookie = escape(name) + "=" + escape(value);
}

function addHover(element, ignore) {
    $(element).children().addClass('trans75');
    $(element).on('click', function(e) {
        nextStep(e);
        return false;
    });
    $(ignore).off('click')
        .children().removeClass('trans75')
        .on('click', function(e) { e.preventDefault(); });
}

var setLinkState = function() {
    $('.subnav').on('click', function() {
        $('.subnav').addClass('trans75');
        $(this).removeClass('trans75');
    });
};

var displayCategories = function() {
    $('#gifImage').fadeOut('slow', function() {
        elementFade('#film');
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