// Para funcionar no IE e necessario o codigo abaixo em qualquer lugar da pagina HTML.
// <iframe id="auxCsvIe" style="display: none"></iframe>
// Este codigo funciona como um auxiliar para contornar as medidas que nao permitem que um arquivo .CSV seja salvo atraves do IE.

$("#a-export").click(function(e) {
	// Use this variable to change CSV file name.
	var nomePlanilha = "planilha";
	
	// Check if navigator is IE or not through the function pegarNavegador().
	if (pegarNavegador() === "Microsoft Internet Explorer") {
		// If navigator is IE, the file codification is going to be UCS-2 Little Endian, so it needs special treatment.
		// Transforms the table data into a CSV formatted file within the UCS-2 Little Endian codification separator.
		var acsv = $('table').table2CSV({separator: '\t', delivery: 'value'});
		var acsvData = decodeURIComponent(acsv);
		
		// Uses an iframe as an auxiliar to download the CSV file.
		var iframe = document.getElementById('auxCsvIe');
		iframe = iframe.contentWindow || iframe.contentDocument;
		
		// Starts codifying and writing the CSV file.
		iframe.document.open("text/html", "replace");
		iframe.document.write(acsvData);
		iframe.document.close();
		iframe.focus();
		
		// Uses the SaveAs IE command to save the CSV file.
		iframe.document.execCommand('SaveAs', true, nomePlanilha + '.csv');
		
	} else {
		// If navigator is not IE, the file codification is going to be UTF-8.
		// Transforms the table data into a CSV formatted file within the UTF-8 format separator.
		var acsv = $('table').table2CSV({separator: ';', delivery: 'value'});
		var acsvData = 'data:text/csv; charset=UTF-8,' + encodeURIComponent(acsv);
		var afilename = nomePlanilha + '.csv';
		
		// Small code to download the CSV file.
		$(this).attr({
			'download': afilename,
			'href': acsvData,
			'target': '_blank'
		});
	}  
});

function exportTableToCSV($table, filename) {

    var $rows = $table.find('tr:has(td)'),

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '";"',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
            var $row = $(row),
                $cols = $row.find('td');

            return $cols.map(function (j, col) {
                var $col = $(col),
                    text = $col.text();

                return text.replace('"', '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"',

        // Data URI
        csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    $(this)
        .attr({
        'download': filename,
            'href': csvData,
            'target': '_blank'
    });
}
    
jQuery.fn.table2CSV = function(options) {
    var options = jQuery.extend({
        separator: ',',
        header: [],
        delivery: 'popup' // popup, value
    },
    options);

    var csvData = [];
    var headerArr = [];
    var el = this;

    //header
    var numCols = options.header.length;
    var tmpRow = []; // construct header avalible array

    if (numCols > 0) {
        for (var i = 0; i < numCols; i++) {
            tmpRow[tmpRow.length] = formatData(options.header[i]);
        }
    } else {
        $(el).filter(':visible').find('th').each(function() {
            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
        });
    }

    row2CSV(tmpRow);

    // actual data
    $(el).find('tr').each(function() {
        var tmpRow = [];
        $(this).filter(':visible').find('td').each(function() {
            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
        });
        row2CSV(tmpRow);
    });
    if (options.delivery == 'popup') {
        var mydata = csvData.join('\n');
        return popup(mydata);
    } else {
        var mydata = csvData.join('\n');
        return mydata;
    }

    function row2CSV(tmpRow) {
        var tmp = tmpRow.join('') // to remove any blank rows
        // alert(tmp);
        if (tmpRow.length > 0 && tmp != '') {
            var mystr = tmpRow.join(options.separator);
            csvData[csvData.length] = mystr;
        }
    }
    function formatData(input) {
        // replace " with â€œ
        var regexp = new RegExp(/["]/g);
        var output = input.replace(regexp, "â€œ");
        //HTML
        var regexp = new RegExp(/\<[^\<]+\>/g);
        var output = output.replace(regexp, "");
        if (output == "&nbsp;") return '';
        if (output == "") return '';
        return '"' + output + '"';
    }
    function popup(data) {
        var generator = window.open('', 'csv', 'height=400,width=600');
        generator.document.write('<html><head><title>CSV</title>');
        generator.document.write('</head><body >');
        generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
        generator.document.write(data);
        generator.document.write('</textArea>');
        generator.document.write('</body></html>');
        generator.document.close();
        return true;
    }
};


// Funcao para descobrir navegador

function pegarNavegador() {
	if(!jQuery.browser){

		jQuery.browser = {};
		jQuery.browser.mozilla = false;
		jQuery.browser.webkit = false;
		jQuery.browser.opera = false;
		jQuery.browser.safari = false;
		jQuery.browser.chrome = false;
		jQuery.browser.msie = false;
		jQuery.browser.android = false;
		jQuery.browser.blackberry = false;
		jQuery.browser.ios = false;
		jQuery.browser.operaMobile = false;
		jQuery.browser.windowsMobile = false;
		jQuery.browser.mobile = false;

		var nAgt = navigator.userAgent;
		jQuery.browser.ua = nAgt;

		jQuery.browser.name  = navigator.appName;

	// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
			jQuery.browser.opera = true;
			jQuery.browser.name = "Opera";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+6);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
				jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
		}

	// In MSIE < 11, the true version is after "MSIE" in userAgent
		else if ( (verOffset=nAgt.indexOf("MSIE"))!=-1) {
			jQuery.browser.msie = true;
			jQuery.browser.name = "Microsoft Internet Explorer";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+5);
		}

	// In TRIDENT (IE11) => 11, the true version is after "rv:" in userAgent
		else if (nAgt.indexOf("Trident")!=-1 ) {
			jQuery.browser.msie = true;
			jQuery.browser.name = "Microsoft Internet Explorer";
			var start = nAgt.indexOf("rv:")+3;
			var end = start+4;
			jQuery.browser.fullVersion = nAgt.substring(start,end);
		}

	// In Chrome, the true version is after "Chrome"
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
			jQuery.browser.webkit = true;
			jQuery.browser.chrome = true;
			jQuery.browser.name = "Chrome";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
		}
	// In Safari, the true version is after "Safari" or after "Version"
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
			jQuery.browser.webkit = true;
			jQuery.browser.safari = true;
			jQuery.browser.name = "Safari";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
				jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
		}
	// In Safari, the true version is after "Safari" or after "Version"
		else if ((verOffset=nAgt.indexOf("AppleWebkit"))!=-1) {
			jQuery.browser.webkit = true;
			jQuery.browser.name = "Safari";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
				jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
		}
	// In Firefox, the true version is after "Firefox"
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
			jQuery.browser.mozilla = true;
			jQuery.browser.name = "Firefox";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
		}
	// In most other browsers, "name/version" is at the end of userAgent
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ){
			jQuery.browser.name = nAgt.substring(nameOffset,verOffset);
			jQuery.browser.fullVersion = nAgt.substring(verOffset+1);
			if (jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()) {
				jQuery.browser.name = navigator.appName;
			}
		}

		/*Check all mobile environments*/
		jQuery.browser.android = (/Android/i).test(nAgt);
		jQuery.browser.blackberry = (/BlackBerry/i).test(nAgt);
		jQuery.browser.ios = (/iPhone|iPad|iPod/i).test(nAgt);
		jQuery.browser.operaMobile = (/Opera Mini/i).test(nAgt);
		jQuery.browser.windowsMobile = (/IEMobile/i).test(nAgt);
		jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile;


	// trim the fullVersion string at semicolon/space if present
		if ((ix=jQuery.browser.fullVersion.indexOf(";"))!=-1)
			jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);
		if ((ix=jQuery.browser.fullVersion.indexOf(" "))!=-1)
			jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);

		jQuery.browser.majorVersion = parseInt(''+jQuery.browser.fullVersion,10);
		if (isNaN(jQuery.browser.majorVersion)) {
			jQuery.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
			jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
		}
		jQuery.browser.version = jQuery.browser.majorVersion;
	}

	return jQuery.browser.name;

}