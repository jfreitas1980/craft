function colorValor(val) {
    if (val > 0) {
        return '<span style="color:green;">' + Ext.util.Format.number(val, '0,0.0/i') + '</span>';
    } else if (val < 0) {
        return '<span style="color:red;">' + Ext.util.Format.number(val, '0,0.0/i') + '</span>';
    }
    return Ext.util.Format.number(val, '0,0.0/i');
}

function colorNumber(val) {
    if (val > 0) {
        return '<span style="color:green;">' + Ext.util.Format.number(val, '0') + '</span>';
    } else if (val < 0) {
        return '<span style="color:red;">' + Ext.util.Format.number(val, '0') + '</span>';
    }
    return Ext.util.Format.number(val, '0');
}

function addTooltip(value, metadata, record, rowIndex, colIndex, store){
    metadata.attr = 'ext:qtip="' + value + '"';
    return value;
}

meses = new Array(12);
	meses[0]  = "01"; meses[1]  = "02"; meses[2]  = "03"; meses[3]  = "04"; meses[4]  = "05"; meses[5]  = "06"; meses[6]  = "07"; meses[7]  = "08"; meses[8]  = "09"; meses[9]  = "10"; meses[10] = "11"; meses[11] = "12";

function atualizarDataHora(){
	var data    = new Date();
	var hora    = data.getHours();
	var minuto  = data.getMinutes();
	var segundo = data.getSeconds();
	var dia     = data.getDate();
	var mes     = data.getMonth();
	var ano     = data.getFullYear();

	var horas
	if (hora<10){
		horas = "0" + hora
	}else{
		horas = hora
	}	
	
	var minutos
	if (minuto<10){
		minutos = "0" + minuto
	}else{
		minutos = minuto
	}
	
	var segundos
	if (segundo<10){
		segundos = "0" + segundo
	}else{
		segundos = segundo
	}

	var dias
	if (dia<10){
		dias = "0" + dia
	}else{
		dias = dia
	}
	
	var DataHora  = "Ultima Atualização : " + dias + "/" +  meses[mes] + "/" + ano + " - " + horas + ":" + minutos + ":" + segundos;
	document.getElementById("datahora").innerHTML = DataHora;
}