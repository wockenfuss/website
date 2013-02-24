$(document).ready(function() {
	$('#nav a').on('click', function(e) {
		if ( this.dataset.value !== 'projects' ) {
			e.preventDefault();
		}
		$('#nav a').each(function() {
			$(this).removeClass('bold');
			$(this.dataset.value).css('display', 'none');
		});
		$(this).addClass('bold');
		var element = this.dataset.value;

		$(element).fadeIn('fast');
	});

	var topOffset = parseInt($('#nav').css('margin-top'), 10);
	$(window).scroll(function () {
      var offset = -($(window).scrollTop()) + topOffset;
      $('#nav').css('margin-top', offset );
  });
});


