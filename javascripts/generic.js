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
});