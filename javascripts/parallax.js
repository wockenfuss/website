$(document).ready(function() {
	var backgroundOffset = parseInt($('#bkd-overlay').css('margin-top'), 10);
	var headerOffset = parseInt($('#header-overlay').css('margin-top'), 10);
	var containerOffset = parseInt($('#mainContainer').css('margin-top'), 10);
	console.log("bkd: " + backgroundOffset);
	console.log("header: "+ headerOffset);
	console.log("container: " + containerOffset);
	$(window).scroll(function () {
      var scrollValue = -($(window).scrollTop());// + topOffset;
      // $('#nav').css('margin-top', offset );
      // console.log(scrollValue);
      $('#bkd-overlay').css('margin-top', backgroundOffset + scrollValue);
      $('#mainContainer').css('margin-top', containerOffset + scrollValue);

  });
});
	