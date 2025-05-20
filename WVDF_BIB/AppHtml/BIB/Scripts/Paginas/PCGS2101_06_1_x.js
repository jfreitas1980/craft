$(document).ready(function() {
	preencheSolicitado();
});

function preencheSolicitado() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2101_emissao/JSON",
		data: { 
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('aCodigo')
		},
		dataType: "json",
		type: "post"
	}).done(function(data) {

		$('#infoNumeroFup').empty().text(data.numerofup);
		$('#infoCliente').empty().text(data.clientefup);
		$('#infoVendedor').empty().text(data.vendedorfup);
		$('#infoMarca').empty().text(data.marcafup);
		$('#infoElaborador').empty().text(data.elaboradorfup);
		$('#infoInicio').empty().text(data.fup_start);
		$('#infoTermino').empty().text(data.fup_end);
		$('#solicitadoFup').empty().html(data.solicitadofup);
		$('#localFup').empty().html(data.Local);
		
		// QUANDO TERMINAR DE LER JSON SOLICITADO RODA JSON LOCAL
		preencheMotivos();
	});
}

function preencheMotivos() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2103_emissao/JSON",
		data: { 
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('aCodigo')
		},
		dataType: "json",
		type: "post"
	}).done(function(data) {

		if (data.length > 0) {
			// Primeira etapa - Produtos
			for (p = 0; p <= (data.length - 1); p++) {

				var linhaNovaP = '';
				var linhaNovaM = '';
				var linhaNovaD = '';

				linhaNovaP = "<tr><td class='rptL' colspan='11' width='95%'>" + data[p].prod_ds;

				if (data[p].pot_v !== '' && data[p].pot_t !== '') 
				{ 
					linhaNovaP += " [ " + data[p].pot_v + " - " + data[p].pot_t + " - " + data[p].pot_f + " ]";
				}

				linhaNovaP += "</td><td class='rptC' width='5%' id='PFup"+p+"' style='background-color: #f9f9f9;'><i class='fa fa-minus-square'></i></td></tr>";

				// Segunda etapa - Motivos
				linhaNovaM = '0';
				if (data[p].motivos.length > 0) {

					for (m = 0; m <= (data[p].motivos.length - 1); m++) {
						
						// Terceira etapa - Detalhes
						var r = 0;
						linhaNovaD = '0';
						if (data[p].motivos[m].detalhes.length > 0) {

							r = data[p].motivos[m].detalhes.length;
							r = r * 2;
							r = r + 2;

							linhaNovaD  = "<tr class ='DFup"+p+m+"  PFup"+p+"'><td></td><td>DATA</td><td>ORIGEM</td><td>DESTINO</td><td>TRADE</td><td colspan='3'>MERCADORIA</td>";
							linhaNovaD  +="<td colspan='2'>CONCORRENTE</td><td>FREQUENCIA</td></tr>";

							for (d = 0; d <= (data[p].motivos[m].detalhes.length - 1); d++) {

								linhaNovaD +="<tr class ='DFup"+p+m+" PFup"+p+"'><td class='rptR'>#"+(d+1)+"</td>"; 
								linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].data+"</td>";
								linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].origem+"</td>";
								linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].destino+"</td>";
								linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].trade+"</td>";
								linhaNovaD +="<td colspan='3'>"+data[p].motivos[m].detalhes[d].mercadoria+"</td>";
								linhaNovaD +="<td colspan='2'>"+data[p].motivos[m].detalhes[d].concorrente+"</td>";
								linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].frequencia+"</td>";
								linhaNovaD +="</tr><tr class ='DFup"+p+m+" PFup"+p+"' ><td >NOTES #"+(d+1)+"</td><td colspan='10' >"+data[p].motivos[m].detalhes[d].comentario+"</td></tr>";

							} //for (d = 0; d <= (data[p].motivos[m].detalhes.length - 1); d++) {						

						} //if (data[p].motivos[m].detalhes.length > 0) {
						
						if (r > 0)	linhaNovaM = "<tr class ='PFup"+p+"'><td id='rowM"+p+m+"' style='background-color: #f9f9f9;' rowspan='"+r+"'>&nbsp;</td>";
						else linhaNovaM = "<tr><td id='rowM"+p+m+"' style='background-color: #f9f9f9;'>&nbsp;</td>";
						

						if (data[p].motivos[m].submotivo_ds !== '') {
							
							linhaNovaM += "<td colspan='10'>"+data[p].motivos[m].motivo_ds;
							linhaNovaM += " <i class='fa fa-arrow-right'></i> "+data[p].motivos[m].submotivo_ds+"</td>";
						
						}
						else linhaNovaM += "<td colspan='10'>"+data[p].motivos[m].motivo_ds+"</td>";

						linhaNovaM += "<td class='rptC' id='MFup"+p+m+"' style='background-color: #f9f9f9;'><i class='fa fa-minus-square'></i></td></tr>";

						if (linhaNovaD !== '0') linhaNovaM += linhaNovaD;

					if (linhaNovaM !== '0') linhaNovaP +=linhaNovaM;
					
					} //for (m = 0; m <= (data[p].motivos.length - 1); m++) {

				} //if (data[p].motivos.length > 0) {

				linhaNovaP += "<tr id='Prods"+ (p+1) +"'><td style='background-color: #f9f9f9;'colspan='12'></td></tr>";

				$('#Prods'+ p).after(linhaNovaP);

			} //for (p = 0; p <= (data.length - 1); p++) {

		} //if (data.length > 0) {
		
	});
}

$(document).on('click', '[id^="MFup"]', function() {
	if (!$(this).children().hasClass('fa-square')){
		if ($(this).children().hasClass('fa-plus-square')) {
			// ABRE
			$(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
			var motivosub = '.DFup' + ($(this).attr('id')).substr(4) + '';
			$(motivosub).show();
			
			var qntdMotivos = $(motivosub).length + 1;
			var rowsAtuais = $('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan');
			var rowsNovos  = (qntdMotivos + parseInt(rowsAtuais));
			
			$('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan', rowsNovos);

		} else {
			// FECHA
			$(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
			console.log($(this));
			var motivosub = '.DFup' + ($(this).attr('id')).substr(4);
			$(motivosub).hide();
			
			var qntdMotivos = $(motivosub).length +1;
			var rowsAtuais = $('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan');
			var rowsNovos  = (parseInt(rowsAtuais) - qntdMotivos);
			
			$('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan', rowsNovos);
		}
	}
});

function openClose(obj) {
	if (!$(obj).children().hasClass('fa-square')){
		if ($(obj).children().hasClass('fa-plus-square')) {
						// ABRE
						console.log(obj);
						$(obj).children().removeClass('fa-plus-square').addClass('fa-minus-square');
						var motivosub = '.DFup' + ($(obj).attr('id')).substr(4) + '';
						$(motivosub).show();
						
						var qntdMotivos = $(motivosub).length + 1;
						var rowsAtuais = $('#rowM' + ($(obj).attr('id')).substr(4)).attr('rowspan');
						var rowsNovos  = (qntdMotivos + parseInt(rowsAtuais));
						
						$('#rowM' + ($(obj).attr('id')).substr(4)).attr('rowspan', rowsNovos);

					} else {
						// FECHA
						console.log(obj);
						$(obj).children().removeClass('fa-minus-square').addClass('fa-plus-square');
						var motivosub = '.DFup' + ($(obj).attr('id')).substr(4);
						$(motivosub).hide();
						
						var qntdMotivos = $(motivosub).length +1;
						var rowsAtuais = $('#rowM' + ($(obj).attr('id')).substr(4)).attr('rowspan');
						var rowsNovos  = (parseInt(rowsAtuais) - qntdMotivos);
						
						$('#rowM' + ($(obj).attr('id')).substr(4)).attr('rowspan', rowsNovos);
					}
				}
			}

$(document).on('click', '[id^="PFup"]', function() { 
	if (!$(this).children().hasClass('fa-square')){
		if ($(this).children().hasClass('fa-plus-square')) {
			// ABRE
			$(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
			var motivo = '.PFup' + ($(this).attr('id')).substr(4) + '';
			$(motivo).show();
			
			var all = $('.rptC').map(function() {
			    return this;
			}).get();

			console.log(all);
			for (var i = all.length - 1; i >= 0; i--) {
				openClose(all[i]);

			}
		
			// var qntdMotivo = $(motivo).length;
			// var rowsAtuais = $('#rowMotivo').attr('rowspan');
			// var rowsNovos  = (qntdMotivo + parseInt(rowsAtuais));
			
			// $('#rowMotivo').attr('rowspan', rowsNovos);
		} else {
			// FECHA
			$(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
			var motivo = '.PFup' + ($(this).attr('id')).substr(4) + '';
			$(motivo).hide();
			
			

			// var qntdMotivo = $(motivo).length;
			// var rowsAtuais = $('#rowMotivo').attr('rowspan');
			// var rowsNovos  = (parseInt(rowsAtuais) - qntdMotivo);
			
			// $('#rowMotivo').attr('rowspan', rowsNovos);
		}
	}
});


$(document).on('click', '#btnPrint', function() {
	window.print();
});
