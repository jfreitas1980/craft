// FORMATAR TELA
$('document').ready( function () {
	// FORMATA O TAMANHO DO IFRAME
	$('#ifrm-pag352_01', window.parent.document).height($('.container-fluid').height());
	
	// AUTOCOMPLETE CAMPO CIDADE
	$(function() {
		$("#csag352_cidade_nome").autocomplete({
			source: function (request, response) {
				$.ajax({
					url: "fbcsag325_descricao.asp",
					data: {
						aUsuarioSessao: $('#jaUsuarioSessao').val(),
						term: retiraAcento(request.term)
					},
					dataType: "json",
					success: function (data) {
						response(data);
					}
				});
			},
			minLength: 2,
			open: function(e,ui) {
				var termTemplate = '<strong>%s</strong>';
				var acData = $(this).data('uiAutocomplete');
				acData
				.menu
				.element
				.find('a')
				.each(function() {
					var me = $(this);
					var regex = new RegExp(acData.term, "gi");
					me.html(me.text().replace(regex, function (matched) {
						return termTemplate.replace('%s', matched);
					}));
				});
			},
			select: function(event, ui) {
				if (ui.item) {
					$('#selstart4').val(ui.item.id);
					$('#selstart6').val(ui.item.pais);
					$(this).val(ui.item.value);
					return false;
				}
			}
		}).autocomplete("instance")._renderItem = function(ul, item) {
			return $("<li>").append("<a>" + item.pais + " - " + item.uf + " - " + item.value + "</a>").appendTo(ul);
		};
		
	});
	
	if (getVariavelURL('RunReport') == 'RunReport' || getVariavelURL('RunReport') == '1') {
		if ($('#botoesReportFinal').is(':empty')) {
			$('#botoesReportFinal').html($('#botoesReportAux').html());
			$('#botoesReportAux').empty();
		}
		
		$('#nextPageFinal').attr('href', $('#nextPageAux').val());

		//window.setInterval(function(){
		//	$('div#pageTabContent div.active iframe', parent.parent.document).css('height', $('#ifrm-pag352_01', parent.document).prop('scrollHeight') + 85 + 'px');
		//	$('div#pageTabContent', parent.parent.document).css('height', $('#ifrm-pag352_01', parent.document).prop('scrollHeight') + 110 + 'px');
		//}, 1000);
	}
	
});