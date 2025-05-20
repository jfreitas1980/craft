$(document).ready(function() {
	$("[name='ccgs214__acao_comercial']").each(function() {
		$(this).removeClass('col-xs-6').addClass('col-xs-12');
	});
	
	$("[name='ccgs214__ccgs213_id']").each(function() {
		$(this).removeClass('col-xs-6').addClass('col-xs-12');
	});
	
	// Configura switchs
	
	$("[id^='switch-MISSING_LOST_checkbox_']").each(function () {
		atual = $(this).attr('id').substr(29);
		configuraSwitchs("", $(this), 'ccgs214__missing_lost_' + atual);
	});
	
	$("[id^='switch-TARGET_checkbox_']").each(function () {
		atual = $(this).attr('id').substr(23);
		configuraSwitchs("", $(this), 'ccgs214__target_' + atual);
	});
	
	$("[id^='switch-MOTIVO_STANDBY_checkbox_']").each(function () {
		atual = $(this).attr('id').substr(31);
		configuraSwitchs("", $(this), 'ccgs214__motivo_standby_' + atual);
	});
	
	$("[id^='switch-ACAO_TOMADA_FUP_checkbox_']").each(function () {
		atual = $(this).attr('id').substr(32);
		configuraSwitchs("", $(this), 'ccgs214__acao_tomada_fup_' + atual);
	});	
	
	// Cliques switchs 
	
	$("[id^='switch-MISSING_LOST_checkbox_']").on('change', function() {
		var status = $(this).prop('checked').toString();
		var id     = $(this).attr('id').substr(29);
		
		
		configuraSwitchs(status, $(this), 'ccgs214__missing_lost_' + id);
	});
	
	$("[id^='switch-TARGET_checkbox_']").on('change', function() {
		var status = $(this).prop('checked').toString();
		var id     = $(this).attr('id').substr(23);
		
		configuraSwitchs(status, $(this), 'ccgs214__target_' + id);
	});
	
	$("[id^='switch-MOTIVO_STANDBY_checkbox_']").on('change', function() {
		var status = $(this).prop('checked').toString();
		var id     = $(this).attr('id').substr(31);
		
		configuraSwitchs(status, $(this), 'ccgs214__motivo_standby_' + id);
	});
	
	$("[id^='switch-ACAO_TOMADA_FUP_checkbox_']").on('change', function() {
		var status = $(this).prop('checked').toString();
		var id     = $(this).attr('id').substr(32);
		
		configuraSwitchs(status, $(this), 'ccgs214__acao_tomada_fup_' + id);
	});
});