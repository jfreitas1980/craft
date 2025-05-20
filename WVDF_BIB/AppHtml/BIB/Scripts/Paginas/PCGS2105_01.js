var aHCGS2104Id;

// FORMATA A PAGINA
$(document).ready(function () {
	
	// PASSA A aHCGS2101Id PARA O SEU RESPECTIVO INPUT
	aHCGS2104Id = $('#aHCGS2104Id').val();
	$('#hcgs2105__hcgs2104_id').val(aHCGS2104Id);
	
	$('#hcgs2105__ccgs210_id').blur();
	
	campos();
	
	if ($('#hcgs2105__codigo').val() != 0) {
		setTimeout(function () {
			$('#titleProduto', window.parent.document).html("Produto: <b>" + $('#hcgs2105__ccgs210_id :selected').text() + "</b>");
			$("#ifrm-pcgs2106_01").attr({
				"src" : "PCGS2106_02.asp?RunReport=1&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS2105Id=" + $('#hcgs2105__codigo').val() 
			});
			$("#ifrm-pcgs2107_01").attr({
				"src" : "PCGS2107_02.asp?RunReport=1&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS2105Id=" + $('#hcgs2105__codigo').val()
			});
			$("#ifrm-pcgs2108_01").attr({
				"src" : "PCGS2108_02.asp?RunReport=1&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS2105Id=" + $('#hcgs2105__codigo').val()
			});
		}, 500);
	}
	
});

// PESQUISA PRODUTO PELO ID
$(document).on('change', '#hcgs2105__ccgs210_id', function() {
	campos();
});

function campos() {
	var sParametros = $('#hcgs2105__ccgs210_id').val();
	var sRetorno = ReadFuncValue(sParametros, "oPCGS2105_01", "get_f_show_fields2105");
	var obj = JSON.parse(sRetorno);
	
	(obj['AWB'] == '1') ? ($('.tr-awb').show()) : ($('.tr-awb').hide());
	(obj['TON'] == '1') ? ($('.tr-ton').show()) : ($('.tr-ton').hide());
	(obj['TEU'] == '1') ? ($('.tr-teus').show()) : ($('.tr-teus').hide());
	(obj['CBM'] == '1') ? ($('.tr-cbm').show()) : ($('.tr-cbm').hide());
	(obj['HBL'] == '1') ? ($('.tr-hbl').show()) : ($('.tr-hbl').hide());
}