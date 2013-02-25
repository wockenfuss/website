$(document).ready(function() {
	$('#nav a').on('click', function(e) {
		if ( this.dataset.value !== 'projects' ) {
			e.preventDefault();
		}
		$('#nav a').each(function() {
			$(this).addClass('trans75');
			$(this.dataset.value).css('display', 'none');
		});
		$(this).removeClass('trans75');
		var element = this.dataset.value;
		$(element).fadeIn('fast');
	});


	// var topOffset = parseInt($('#rightContent').css('margin-top'), 10);

	// $(window).scroll(function () {
	// 	// var offset = -($(window).scrollTop()) + 120;
	// 	// $('#mainContent').css('margin-top', offset/2 );

	// 	console.log(topOffset);
	// 	$(window).scroll(function () {
 //      var offset = -($(window).scrollTop()) + topOffset + 100;
 //      console.log($(window).scrollTop());
 //      $('#rightContent').css('margin-top', offset );
 //  	});
	// });


});


