$(document).ready(function() {
    var cookie = readCookie('visit');
    if ( cookie === "1" ) {
        defaultDisplayOnReturn();
    } else {
        defaultDisplayOnFirstVisit();
    }

    $(window).scroll(function () {
      var scrollValue = -($(window).scrollTop());
      $('#bkd-overlay').css('margin-top', scrollValue);
      $('#mainContainer').css('margin-top', scrollValue);

  });
});

var defaultDisplayOnFirstVisit = function() {
    loadLatestTweet();
    leftNavListeners();
};

var defaultDisplayOnReturn = function() {
    $('#gifImage').css('display', 'none');
    $('.subnav').fadeIn('fast');
    $('#nav a').removeClass('invisible');
    $('#projects').removeClass('trans75');
    $('#film').fadeIn('fast');
    leftNavListeners();
    rightNavListeners($('.subnav'), $('.subnav').last().parent());
};

function leftNavListeners() {
    $('#nav a').on('click', function(e) {
        e.preventDefault();
        setCookie('visit', '1');
        displayContent(e);
        $('#nav a').removeClass('invisible')
            .addClass('trans75');
        $(e.target).removeClass('trans75');
    });
}

function setCookie(name, value) {
    document.cookie = escape(name) + "=" + escape(value);
}

function rightNavListeners(element, ignore) {
    $(element).addClass('trans75');
    $(element).on('click', function(e) {
        contentForThis(e);
        return false;
    });
    $(ignore).off('click')
        .children().removeClass('trans75')
        .on('click', function(e) { e.preventDefault(); });
}

var displayContent = function(e) {
    var fadeInElement;
    var visible = $('#mainContent').children(':visible');
    var currentElement = visible || '#gifImage';
    var target =  e.target.textContent;
    switch(target)
    {
    case "Projects":
        fadeInElement = '#film';
        var $links = $('.subnav');
        $('.subnav').fadeIn('fast');
        rightNavListeners($links, $links.last().parent());
        break;
    case "Bio":
        fadeInElement = '#bio';
        $('.subnav').fadeOut('fast');
        break;
    case "Contact":
        fadeInElement = '#contact';
        $('.subnav').fadeOut('fast');
        break;
    default:
        console.log('problem');
        break;
    }

    $(currentElement).fadeOut('fast', function() {
        $(fadeInElement).fadeIn('fast');
    });
    
};

var contentForThis = function(e) {
    var $outFade = $('.list:visible');
    var inFade = e.target.getAttribute('data-value');
    if ( $outFade ) {
        $outFade.fadeOut('fast', function() {
            $(inFade).fadeIn('fast');
        });
        rightNavListeners($('.subnav'), e.target.parentElement);
    }
};

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