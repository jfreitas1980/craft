var jsOK = 1;

                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {



                    $('#btn-VALIDAEMPRESA').click(function(){
                        var aEmpresa = $('#csag324__empresa').val();
                        if (aEmpresa == 0 || aEmpresa == '') {
                          jAlert('warning', 'Selecione uma Empresa', 'Atencao', function(r){
                              if (r) {
                                $('#csag324__empresa').select();
                                $('#csag324__empresa').focus();
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