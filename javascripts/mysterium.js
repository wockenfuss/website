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
});