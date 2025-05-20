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
		$('#infoElaborador').empty().text(data.elaboradorfup);
		$('#infoMarca').empty().text(data.marcafup);
		$('#infoInicio').empty().text(data.fup_start);
		$('#infoTermino').empty().text(data.fup_end);
		
		// QUANDO TERMINAR DE LER JSON SOLICITADO RODA JSON LOCAL
		preencheNotes();
	});
}
function preencheNotes() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2102_notes/JSON",
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
			
			var texto;
			
			if (data[0].obs_id != "" && data[0].obs != "")
					texto = data[0].motivo_ds + ' ['+ data[0].obs_id + '-' + data[0].obs + ']';
			else
				texto = data[0].motivo_ds;
			$('#motivoColuna2').text(texto);
			
			if (data[0].selecionado == 1 && data[0].array_produtos.length > 0)
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
					
					linhaNova += "]</td><td colspan='6'>";
					if (data[i].obs_id != "" && data[i].obs != 0) {
						linhaNova += data[i].motivo_ds +' ['+ data[i].obs_id + '-' + data[i].obs + ']';
					}
					else 
						linhaNova += data[i].motivo_ds;
					
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
							
							if (data[i].array_produtos[x].anual_v != 0 && data[i].array_produtos[x].anual_t  != "") {
								linhaNova += "<td colspan='2'>" + data[i].array_produtos[x].prod_ds + "</td>";
								linhaNova += "<td>" + data[i].array_produtos[x].anual_t + "</td>";
							}
							else
								linhaNova += "<td colspan = '3'>" + data[i].array_produtos[x].prod_ds + "</td>";
							//linhaNova += "<td>" + data[i].array_produtos[x].anual_t + "</td>";
							//linhaNova += "<td colspan='2'>" + data[i].array_produtos[x].anual_v + "</td>";

							linhaNova += "</td><td width='30px'>";
							
							if (data[i].array_produtos[x].selecionado == 1 && data[i].array_produtos[x].array_produtos_2.length > 0)
								linhaNova += "<span id='mMotivoSub10" + i + "'><i class='fa fa-plus-square'></i></span>";
							else
								linhaNova += "<span><i class='fa fa-square'></i></span>";
							
							linhaNova += "</td></tr>";
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
						
						if (data[0].array_produtos[y].anual_v != 0 && data[0].array_produtos[y].anual_t != "") {
							linhaNova += "<td colspan='2'>" + data[0].array_produtos[y].prod_ds + "</td>";
							linhaNova += "<td>" + data[0].array_produtos[y].anual_t + "</td>";
						}
						else
							linhaNova += "<td colspan = '3'>" + data[0].array_produtos[y].prod_ds + "</td>";
						//linhaNova += "<td>" + data[0].array_produtos[y].anual_t + "</td>";
						//linhaNova += "<td colspan='2'>" + data[0].array_produtos[y].anual_v + "</td>";
							
						linhaNova += "</td><td width='30px'>";
							
							if (data[0].array_produtos[y].selecionado == 1 && data[0].array_produtos[y].array_produtos_2.length > 0)
								linhaNova += "<span id='mMotivoSub100'><i class='fa fa-plus-square'></i></span>";
							else
								linhaNova += "<span><i class='fa fa-square'></i></span>";
							
							linhaNova += "</td></tr>";

						$('#celulaMotivo').after(linhaNova);
				}
			}
		}
		preencheDetalhes();
	});
}

function preencheDetalhes(){
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2105_detalhes/JSON",
		data: { 
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('aCodigo')
		},
		dataType: "json",
		type: "post"
	}).done(function(data) {
		// Determina quantas linhas o TH "DETALHES" vai pegar
		if (data.length > 0) {
			$('#rowDetalhe').attr('rowspan', data.length);
			
			$('#detalheColuna1').html('[<i class="fa fa-asterisk"></i>]');
			
			var texto;
			
			$('#detalheColuna2').text(data[0].Prod);
			
			$('#detalheColuna3').html('<span id="mDetalhe0"><i class="fa fa-plus-square"></i></span>');
			

			// Roda um for que lerá linha por linha.
			for (i = 0; i <= (data.length - 1); i++) {
				
				if (i > 0) {
					var linhaNova;
					
					linhaNova  = "<tr>";
					linhaNova += "<td class='rptC'>[";
					
					linhaNova += '<i class="fa fa-asterisk"></i>';
					
					linhaNova += "]</td><td colspan='6'>";
					
					linhaNova += data[i].Prod;
					
					linhaNova += "</td><td width='30px'>";
					
					linhaNova += "<span id='mDetalhe" + i + "'><i class='fa fa-plus-square'></i></span>";
					
					linhaNova += "</td></tr>";

					linhaNova += "<tr class='mProdDetalhes" + i +"' style='display: none; background-color: rgb(252, 255, 240);'>";
					linhaNova += "<td class='rptR'></td>";
					linhaNova += "<td>ORIGEM</td>";
					linhaNova += "<td>DESTINO</td>";
					linhaNova += "<td>TRADE</td>";
					linhaNova += "<td>MERCADORIA</td>";
					linhaNova += "<td>CONCORRENTE</td>";
					linhaNova += "<td>FREQUENCIA</td>";
					linhaNova += "</tr>";

					// Roda um for que lerá produto por produto de cada linha
					for (x = 0; x < (data[i].arr_detalhes.length); x++) {
						linhaNova += "<tr class='mProdDetalhes" + i +"' style='display: none; background-color: rgb(252, 255, 240);'>";
						linhaNova += "<td class='rptR'><i class='fa fa-arrow-right'></i></td>";
						linhaNova += "<td>" + data[i].arr_detalhes[x].Origem + "</td>";
						linhaNova += "<td>" + data[i].arr_detalhes[x].Destino + "</td>";
						linhaNova += "<td>" + data[i].arr_detalhes[x].Trade + "</td>";
						linhaNova += "<td>" + data[i].arr_detalhes[x].Mercadoria + "</td>";
						linhaNova += "<td>" + data[i].arr_detalhes[x].Concorrente + "</td>";
						linhaNova += "<td>" + data[i].arr_detalhes[x].Freq + "</td>";
						
						linhaNova += "</tr>";
					}
					$('#celulaDetalhe').after(linhaNova);
				}
			}
			
			// Completa com PRODUTOS do MOTIVO 0
			if (data[0].Prod_id != "") {
					linhaNova =  "<tr class='mProdDetalhes0' style='display: none; background-color: rgb(252, 255, 240);'>";
					linhaNova += "<td class='rptR'></td>";
					linhaNova += "<td>ORIGEM</td>";
					linhaNova += "<td>DESTINO</td>";
					linhaNova += "<td>TRADE</td>";
					linhaNova += "<td>MERCADORIA</td>";
					linhaNova += "<td>CONCORRENTE</td>";
					linhaNova += "<td>FREQUENCIA</td>";
					linhaNova += "</tr>";
				for (y = 0; y < (data[0].arr_detalhes.length); y++) {
					

					linhaNova +=  "<tr class='mProdDetalhes0' style='display: none; background-color: rgb(252, 255, 240);'>";
					linhaNova += "<td class='rptR'><i class='fa fa-arrow-right'></i></td>";							
					linhaNova += "<td>" + data[0].arr_detalhes[y].Origem + "</td>";
					linhaNova += "<td>" + data[0].arr_detalhes[y].Destino + "</td>";
					linhaNova += "<td>" + data[0].arr_detalhes[y].Trade + "</td>";
					linhaNova += "<td>" + data[0].arr_detalhes[y].Mercadoria + "</td>";
					linhaNova += "<td>" + data[0].arr_detalhes[y].Concorrente + "</td>";
					linhaNova += "<td>" + data[0].arr_detalhes[y].Freq + "</td>";
					linhaNova += "</tr>";
				}

				$('#celulaDetalhe').after(linhaNova);
			}
		}
	});
}

$(document).on('click', '[id^="mMotivoSub100"]', function() {
	if (!$(this).children().hasClass('fa-square')){
		if ($(this).children().hasClass('fa-plus-square')) {
			// ABRE
			$(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
			var motivosub = '.mMotivoProdutoSub' + ($(this).attr('id')).substr(7) + '';
			$(motivosub).show();
			
			var qntdMotivosub = $(motivosub).length;
			var rowsAtuaissub = $('#rowMotivoSub').attr('rowspan');
			var rowsNovossub  = (qntdMotivosub + parseInt(rowsAtuaissub));
			
			$('#rowMotivoSub').attr('rowspan', rowsNovossub);
		} else {
			// FECHA
			$(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
			var motivosub = '.mMotivoProdutoSub' + ($(this).attr('id')).substr(7) + '';
			$(motivosub).hide();
			
			var qntdMotivosub = $(motivosub).length;
			var rowsAtuaissub = $('#rowMotivoSub').attr('rowspan');
			var rowsNovossub  = (parseInt(rowsAtuaissub) - qntdMotivosub);
			
			$('#rowMotivoSub').attr('rowspan', rowsNovossub);
		}
	}
});

$(document).on('click', '[id^="mMotivo"]', function() {
	if (!$(this).children().hasClass('fa-square')){
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
	}
});

$(document).on('click', '[id^="mDetalhe"]', function() {
	
		if ($(this).children().hasClass('fa-plus-square')) {
			// ABRE
			$(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
			var detalhe = '.mProdDetalhes' + ($(this).attr('id')).substr(8) + '';
			$(detalhe).show();
			
			var qntdDetalhe = $(detalhe).length;
			var rowsAtuais = $('#rowDetalhe').attr('rowspan');
			var rowsNovos  = (qntdDetalhe + parseInt(rowsAtuais));
			
			$('#rowDetalhe').attr('rowspan', rowsNovos);
		} else {
			// FECHA
			$(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
			var detalhe = '.mProdDetalhes' + ($(this).attr('id')).substr(8) + '';
			$(detalhe).hide();
			
			var qntdDetalhe = $(detalhe).length;
			var rowsAtuais = $('#rowDetalhe').attr('rowspan');
			var rowsNovos  = (parseInt(rowsAtuais) - qntdDetalhe);
			
			$('#rowDetalhe').attr('rowspan', rowsNovos);
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

$(document).on('click', '#btnPrint', function() {
	window.print();
});