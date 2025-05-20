$(document).ready(function() {
	preencheFeito();
});

function preencheFeito() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2101_solpor/JSON",
		data: { 
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('aCodigo')
		},
		dataType: "json",
		type: "post"
	}).done(function(data) {
		if (data.nossoComercial == 1)
			$('#nossoComercial').empty().append('(<i class="fa fa-times"></i>)');
		if (data.pedidoCliente == 1)
			$('#clienteLigou').empty().append('(<i class="fa fa-times"></i>)');
		
		$('#infoNumeroFup').empty().text(data.numerofup);
		$('#infoCliente').empty().text(data.clientefup);
		$('#infoVendedor').empty().text(data.vendedorfup);
		$('#infoMarca').empty().text(data.marcafup);
		$('#infoInicio').empty().text(data.fup_start);
		$('#infoTermino').empty().text(data.fup_end);
		
		// QUANDO TERMINAR DE LER JSON SOLICITADO RODA JSON LOCAL
		preencheNotes();
	});
}
function preencheNotes() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2103_notes/JSON",
		data: { 
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('aCodigo')
		},
		dataType: "json",
		type: "post"
	}).done(function(data) {
		
		if (data.length > 0) {
			$('#rowNote').attr('rowspan', data.length);
			
			sdata = data[0].datahora;
			
			sdata = sdata.substr(8, 2) + '/' + sdata.substr(5, 2) + '/' + sdata.substr(0, 4) + ' - ' + sdata.substr(11, 5);
			
			$('#noteColuna1').text(sdata);
			
			$('#noteColuna2').html('<span id="mNote0"><i class="fa fa-plus-square"></i></span>');
			
			for (z = 0; z <= (data.length - 1); z++) {
				if (z > 0) {
					sdata = data[z].datahora;
			
					sdata = sdata.substr(8, 2) + '/' + sdata.substr(5, 2) + '/' + sdata.substr(0, 4) + ' - ' + 	sdata.substr(11, 5);
					
					novaLinha = "<tr>";
					novaLinha += '<td class="rptC"><i class="fa fa-comment-o"></i></td>';
					novaLinha += '<td colspan="4">' + (sdata) + '</td>';
					novaLinha += '<td width="30px"><span id="mNote' + z + '"><i class="fa fa-plus-square"></i></span></td>';
					novaLinha += '</tr>';
					
					novaLinha += '<tr class="trNote' + z + '" style="display:none;" >';
					novaLinha += '<td></td>';        
					novaLinha += '<td style="background-color: rgb(252, 255, 240);" colspan="10">' + data[z].note + '</td>';
					novaLinha += '</tr>';
					
					$('#celulaNote').after(novaLinha);
				}
			}
			
			var novaLinha = "<tr class='trNote0' style='display: none;'><td></td><td style='background-color: rgb(252, 255, 240);' colspan='10'>" + data[0].note +"</td></tr>";
			
			$('#celulaNote').after(novaLinha);

		}
		preencheMotivos();
	});
}
function preencheMotivos() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2104_motivos/JSON",
		data: { 
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('aCodigo')
		},
		dataType: "json",
		type: "post"
	}).done(function(data) {
		// Determina quantas linhas o TH "MOTIVOS" vai pegar
		if (data.length > 0) {
			$('#rowMotivo').attr('rowspan', data.length);
			
			if (data[0].selecionado == 1)
				$('#motivoColuna1').html('[<i class="fa fa-times"></i>]');
			else
				$('#motivoColuna1').html('[ &nbsp; ]');
			
			$('#motivoColuna2').text(data[0].motivo_213);
			
			if (data[0].selecionado == 1)
				$('#motivoColuna3').html('<span id="mMotivo0"><i class="fa fa-plus-square"></i></span>');
			else
				$('#motivoColuna3').html('<span id="mMotivo0"><i class="fa fa-square"></i></span>');
			
			// Roda um for que lerá linha por linha.
			for (i = 0; i <= (data.length - 1); i++) {
				if (i > 0) {
					var linhaNova;
					
					linhaNova  = "<tr>";
					linhaNova += "<td class='rptC'>[";
					
					if (data[i].selecionado == 1)
						linhaNova += "<i class='fa fa-times'></i>";
					else
						linhaNova += " &nbsp; ";
					
					linhaNova += "]</td><td colspan='4'>";
					linhaNova += data[i].motivo_213;
					linhaNova += "</td><td width='30px'>";
					
					if (data[i].selecionado == 1 && data[i].array_produtos.length > 0)
						linhaNova += "<span id='mMotivo" + i + "'><i class='fa fa-plus-square'></i></span>";
					else
						linhaNova += "<span><i class='fa fa-square'></i></span>";
					
					linhaNova += "</td></tr>";
					
					// Roda um for que lerá produto por produto de cada linha
					if (data[i].selecionado == 1) {
						for (x = 0; x < (data[i].array_produtos.length); x++) {
							linhaNova += "<tr class='mMotivoProduto" + i +"' style='display: none; background-color: rgb(252, 255, 240);'>";
							linhaNova += "<td class='rptR'><i class='fa fa-arrow-right'></i></td>";
							linhaNova += "<td>" + data[i].array_produtos[x].produto_desc + "</td>";
							
							linhaNova += "<td>" + data[i].array_produtos[x].anual_1 + "</td>";
							linhaNova += "<td colspan='2'>" + data[i].array_produtos[x].anual_2 + "</td>";
							linhaNova += "<td></td>";
							linhaNova += "</tr>";
						}
					}
					$('#celulaMotivo').after(linhaNova);
				}
			}
			
			// Completa com PRODUTOS do MOTIVO 0
			if (data[0].selecionado == 1) {
				for (y = 0; y < (data[0].array_produtos.length); y++) {
					var linhaNova =  "<tr class='mMotivoProduto0' style='display: none; background-color: rgb(252, 255, 240);'>";
						linhaNova += "<td class='rptR'><i class='fa fa-arrow-right'></i></td>";
						linhaNova += "<td>" + data[0].array_produtos[y].produto_desc + "</td>";
													
						linhaNova += "<td>" + data[i].array_produtos[x].anual_1 + "</td>";
						linhaNova += "<td colspan='2'>" + data[i].array_produtos[x].anual_2 + "</td>";
						linhaNova += "<td></td>";
						linhaNova += "</tr>";

						$('#celulaMotivo').after(linhaNova);
				}
			}
		}
	});
}

$(document).on('click', '[id^="mMotivo"]', function() {
	if ($(this).children().hasClass('fa-plus-square')) {
		// ABRE
		$(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
		var motivo = '.mMotivoProduto' + ($(this).attr('id')).substr(7) + '';
		$(motivo).show();
		
		var qntdMotivo = $(motivo).length;
		var rowsAtuais = $('#rowMotivo').attr('rowspan');
		var rowsNovos  = (qntdMotivo + parseInt(rowsAtuais));
		
		$('#rowMotivo').attr('rowspan', rowsNovos);
	} else {
		// FECHA
		$(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
		var motivo = '.mMotivoProduto' + ($(this).attr('id')).substr(7) + '';
		$(motivo).hide();
		
		var qntdMotivo = $(motivo).length;
		var rowsAtuais = $('#rowMotivo').attr('rowspan');
		var rowsNovos  = (parseInt(rowsAtuais) - qntdMotivo);
		
		$('#rowMotivo').attr('rowspan', rowsNovos);
	}
});

$(document).on('click', '[id^="mNote"]', function() {
	if ($(this).children().hasClass('fa-plus-square')) {
		// ABRE
		$(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
		
		var note = '.trNote' + ($(this).attr('id')).substr(5) + '';
		$(note).show();
		
		var qntdMotivo = $(note).length;
		var rowsAtuais = $('#rowNote').attr('rowspan');
		var rowsNovos  = (qntdMotivo + parseInt(rowsAtuais));
		
		$('#rowNote').attr('rowspan', rowsNovos);
	} else {
		// FECHA
		$(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
		
		var note = '.trNote' + ($(this).attr('id')).substr(5) + '';
		$(note).hide();
		
		var qntdMotivo = $(note).length;
		var rowsAtuais = $('#rowNote').attr('rowspan');
		var rowsNovos  = (parseInt(rowsAtuais) - qntdMotivo);
		
		$('#rowNote').attr('rowspan', rowsNovos);
	}
});