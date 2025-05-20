$(document).ready(function() {

	configuraSwitchs("", $('#switch-SHOW_CALENDARIO_checkbox'), 'ccgs235__show_calendario');
	
});

$(document).on('change', '#switch-SHOW_CALENDARIO_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'ccgs235__show_calendario');
});