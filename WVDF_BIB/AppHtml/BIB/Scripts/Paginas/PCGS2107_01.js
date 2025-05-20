var aHCGS2105Id;

// FORMATA A PAGINA
$(document).ready(function () {
	$('#hcgs2107__ncm').removeClass('col-xs-6').addClass('col-xs-2');
	// PASSA A aHCGS2101Id PARA O SEU RESPECTIVO INPUT
	aHCGS2105Id = $('#aHCGS2105Id').val();
	$('#hcgs2107__hcgs2105_id').val(aHCGS2105Id);
	
	$('#hcgs2107__ncm').blur();
	
	// window.setTimeout(function(){
		// $('div#pageTabContent .tab-pane.active', parent.parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
		
		// $('div#pageTabContent div.active iframe', parent.parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
		
		// $('#ifrm-pcgs2101_00', parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
	// }, 1000);
	
	$('#ncm_desc').addClass('col-xs-10').removeClass('col-xs-6').height('100px');
});



// BLUR NCM
$(document).on('blur', '#hcgs2107__ncm', function() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCCGS219/JSON",
		data: {
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sNCM: $(this).val()
		}
	}).done(function(data) {
		if ((data.Descricao).substr(0, 4) == "ERR#" ) {			
			parent.alertify.error((data.Descricao).substr(4));
			$('#ncm_desc').val('');
			return;
		}
		$('#ncm_desc').val(data.Descricao);
	});
});


// AUTOCOMPLETE DESCRIÇÃO PARA NCM
$(function() {
    $("#ncm_desc").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbccgs219_descricao.asp",
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
				$('#hcgs2107__ncm').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});