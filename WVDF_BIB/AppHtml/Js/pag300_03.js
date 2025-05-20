                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {
   

                    $( "#csag300__usuariodtnasfun" ).datepicker({
                        showOtherMonths: true,
                        selectOtherMonths: false,
                        changeMonth: true,
                        changeYear: true,
                        showButtonPanel: true,
                        dateFormat: "dd/mm/yy"
                    });
					
                });