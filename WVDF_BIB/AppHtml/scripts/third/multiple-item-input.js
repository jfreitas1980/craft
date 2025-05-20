/*	
	================================================================
	THIAGO BOVO
	@DATA: 08.12.2009
	@DESC: PERMITE ADICIONAR E REMOVE MULTIPLOS ITENS EM UM INPUT
	================================================================
*/	

function mtAddItem(codigo, nome, idtable, idhidden) 
{
	if($('#' + idtable + ' tr').hasClass('it_' + codigo + '').toString()=="false")
	{
		// adiciona codigo no hidden separando por "||"
		var hidden = $('#' + idhidden).val();
		hidden = hidden + codigo + '||';
		$('#' + idhidden).val(hidden);
		
		// adiciona item selecionados a table de tens selecionados
		$('#' + idtable).append('<tr class="it_' + codigo +'"><td>' + nome +'</td><td style="width:16px;"><a href="javascript:void(0);" onclick="mtRemoveItem('+ codigo +',\''+ idtable +'\',\''+ idhidden +'\')" title="">X</a></td></tr>');
		if($('#' + idtable +' tr').length>0) $('#' + idtable).show();
	}
}

function mtRemoveItem(codigo, idtable, idhidden) 
{
	// remove codigo do hidden
	var hidden = $('#' + idhidden).val();
	hidden = hidden.replace(codigo + '||','');
	$('#' + idhidden).val(hidden);
	
	// remove item selecionados a table de tens selecionados
	$('#' + idtable + ' tr.it_' + codigo).remove();
	if($('#' + idtable +' tr').length==0) $('#' + idtable).hide();
}