<script type="text/javascript">

	
	oTable1.on( 'draw.dt', function () 
	{
		$('#myModal').modal('hide');
		parent.resizeFrame(window.frameElement.id);
	} );

	//TableTools settings
	TableTools.classes.container = "btn-group btn-overlap";
	TableTools.classes.print = {
		"body": "DTTT_Print",
		"info": "tableTools-alert gritter-item-wrapper gritter-info gritter-center white",
		"message": "tableTools-print-navbar"
	}

	//initiate TableTools extension
	var tableTools_obj = new $.fn.dataTable.TableTools( oTable1, {
		"sSwfPath": "/wvdf_cac_8/assets/js/dataTables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
		"sSelectedClass": "success",
		"aButtons": [
			{
				"sExtends": "copy",
				"sToolTip": "Copiar para a àrea de transferência",
				"sButtonClass": "btn btn-white btn-primary btn-bold",
				"sButtonText": "<i class='fa fa-copy bigger-110 pink'></i>",
				"fnComplete": function() {
					this.fnInfo( '<h3 class="no-margin-top smaller">Tabela Copiada</h3>\
						<p>Copiadas '+(oTable1.fnSettings().fnRecordsTotal())+' colunas para a àrea de transferência.</p>',
						1500
					);
				}
			},
			
			//{
			//	"sExtends": "csv",
			//	"sToolTip": "Exportar para CSV",
			//	"sButtonClass": "btn btn-white btn-primary  btn-bold",
			//	"sButtonText": "<i class='fa fa-file-excel-o bigger-110 green'></i>"
			//},
			
			{
				"sExtends": "xls",
				"sToolTip": "Exportar para XLS",
				"sButtonClass": "btn btn-white btn-primary  btn-bold",
				"sButtonText": "<i class='fa fa-file-excel-o bigger-110 green'></i>"
			}//,
			
			//{
			//	"sExtends": "pdf",
			//	"sToolTip": "Exportar para PDF",
			//	"sButtonClass": "btn btn-white btn-primary  btn-bold",
			//	"sButtonText": "<i class='fa fa-file-pdf-o bigger-110 red'></i>"
			//},
			
			//{
			//	"sExtends": "print",
			//	"sToolTip": "Visualizar impressão",
			//	"sButtonClass": "btn btn-white btn-primary  btn-bold",
			//	"sButtonText": "<i class='fa fa-print bigger-110 grey'></i>",
			//	
			//	"sMessage": "<div class='navbar navbar-default'><div class='navbar-header pull-left'><a class='navbar-brand' href='#'><small>Optional Navbar &amp; Text</small></a></div></div>",
			//	
			//	"sInfo": "<h3 class='no-margin-top'>Print view</h3>\
			//			  <p>Please use your browser's print function to\
			//			  print this table.\
			//			  <br />Press <b>escape</b> when finished.</p>",
			//}
		]
	} );
	
	$(tableTools_obj.fnContainer()).appendTo($('.tableTools-container'));
</script>