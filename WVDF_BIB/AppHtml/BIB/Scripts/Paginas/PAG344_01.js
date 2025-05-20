function consultaCenter(){
				var sDiv = document.getElementById("divIMG_UPLOAD");
				sDiv.style.display = "";
			}

			function fechaDivPopUp(){
				var sDiv = document.getElementById("divIMG_UPLOAD");
				sDiv.style.display = "none";
			}

			function posiciona(RetCampos,RetValores,Programa){
				valores = RetValores.split('|');
				switch(Programa){
					case 'UPLOAD':
						document.Csag344.img_upload.value    = valores[1];
						document.getElementById('frameIMG_UPLOAD').src='PCRM800_01PreUp.asp?aPrograma=<%=aPrograma%>';
					    fechaDivPopUp();
					break

					default:
						alert('falha no relatorio')
				}

			}

var jsOK = 1;

                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {



                    $('#btn-VALIDAEMPRESA').click(function(){
                        var aEmpresa = $('#csag344__csag308_nr').val();
                        if (aEmpresa == 0 || aEmpresa == '') {
                          jAlert('warning', 'Selecione uma Empresa', 'Atencao', function(r){
                              if (r) {
                                $('#csag344__csag308_nr').select();
                                $('#csag344__csag308_nr').focus();
                                return false;
                              }
                          });
                        } else { jsOK=0 };

                        if (jsOK==0) {
                           jsSalvar(0);
                        }
                    });

                  // FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
                  // SE O RECNUM ESTIVER IGUAL A ZERO.
                  if ($('#aCI').val()!=1) {
                      if ($('#btn-VALIDAEMPRESA').is(':visible')) {
                          $('#btn-VALIDAEMPRESA').hide();
                      }
                  }
                  else {
                      if ($('#btn-VALIDAEMPRESA').is(':visible')) {}
                      else {
                          $('#btn-VALIDAEMPRESA').show();
                      }
                  }


                  // FAZ COM QUE O BOTAO EXCLUIR NAO SEJA EXIBIDO NA TELA
                  // SE O RECNUM ESTIVER IGUAL A ZERO.
                  if ($('#aCE').val()!=1) {
                      if ($('#btn-EXCLUIR').is(':visible')) {
                          $('#btn-EXCLUIR').hide();
                      }
                  }
                  else {
                      if ($('#btn-EXCLUIR').is(':visible')) {}
                      else {
                          $('#btn-EXCLUIR').show();
                      }
                  }

                });