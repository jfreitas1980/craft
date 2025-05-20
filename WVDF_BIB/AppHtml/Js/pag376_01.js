
                var jsOK = 1;
        
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {
   
                    $('#csag376__csag300_email').attr('disabled', 'disabled');                   
                    
                    //removeClass
                    $('#csag376__csag308_nr').removeClass('ddEntryCombo');
                    $('#csag376__divisao_id').removeClass('ddEntryCombo');
   
                    $('#csag376__csag300_ds').addClass('accsag300usuarionome');   
                    $(".accsag300usuarionome").autocomplete({
                        source: function( request, response ) {
                            $.ajax({
                                url: "/wvdf_cac_8/fbcsag300_usuarionumero.asp",
                                data: {
                                    aUsuarioSessao: $('#jaUsuarioSessao').val(), 
                                    aCSAG308_NR: $('#csag376__csag308_nr option:selected').val(),
                                    term: request.term
                                },
                                dataType: "json",
                                success: function( data ) {
                                    response(data);
                                }
                            });
                        },
                        minLength: 2,
                        open: function(e,ui) {
                            var termTemplate = '<strong>%s</strong>';
                            var acData = $(this).data('uiAutocomplete');
                            acData
                            .menu
                            .element
                            .find('a')
                            .each(function() {
                                var me = $(this);
                                var regex = new RegExp(acData.term, "gi");
                                me.html( me.text().replace(regex, function (matched) {
                                    return termTemplate.replace('%s', matched);
                                }));
                            });
                        },
                        select: function( event, ui ) {
                            if (ui.item) {
                                var selecionado_id = ui.item.id;
                                var selecionado_value = ui.item.value;
                                var selecionado_label = ui.item.label;
                                var selecionado_email = ui.item.email;
                                //alert('Selecionei o ID ' + selecionado_id + ' = '+selecionado_value);
                                //aqui, o value está em outro input para submit do form, poderá ser hidden
                                $("#csag376__csag300_id").val(selecionado_id);
                                $("#csag376__csag300_email").val(selecionado_email);
                                this.value = selecionado_value;
                                return false;
                            }
                        }
                    });
                    
                    //blur
                    $('#csag376__csag300_id').blur(function(){
                        var acsag308_nr = $('#csag376__csag308_nr option:selected').val();
                        var sRetorno = ReadFuncValue($(this).val()+'","'+acsag308_nr,"oPAG300_01","get_f_pgCSAG300_usuarionome");
                        $('#csag376__csag300_ds').val(sRetorno);
                            sRetorno = ReadFuncValue($(this).val()+'","'+acsag308_nr,"oPAG300_01","get_f_pgCSAG300_usuarioemail");
                        $('#csag376__csag300_email').val(sRetorno);
                    });

                    // foi implementado para que a classe do autocomplete seja refeita com a empresa selecionada.
                    $('#csag376__csag308_nr').change(function(){
                        $(".accsag300usuarionome").autocomplete({
                            source: function( request, response ) {
                                $.ajax({
                                    url: "/wvdf_cac_8/fbcsag300_usuarionumero.asp",
                                    data: {
                                        aUsuarioSessao: $('#jaUsuarioSessao').val(), 
                                        aCSAG308_NR: $('#csag376__csag308_nr option:selected').val(),
                                        term: request.term
                                    },
                                    dataType: "json",
                                    success: function( data ) {
                                        response(data);
                                    }
                                });
                            },
                            minLength: 2,
                            open: function(e,ui) {
                                var termTemplate = '<strong>%s</strong>';
                                var acData = $(this).data('uiAutocomplete');
                                acData
                                .menu
                                .element
                                .find('a')
                                .each(function() {
                                    var me = $(this);
                                    var regex = new RegExp(acData.term, "gi");
                                    me.html( me.text().replace(regex, function (matched) {
                                        return termTemplate.replace('%s', matched);
                                    }));
                                });
                            },
                            select: function( event, ui ) {
                                if (ui.item) {
                                    var selecionado_id = ui.item.id;
                                    var selecionado_value = ui.item.value;
                                    var selecionado_label = ui.item.label;
                                    var selecionado_email = ui.item.email;
                                    //alert('Selecionei o ID ' + selecionado_id + ' = '+selecionado_value);
                                    //aqui, o value está em outro input para submit do form, poderá ser hidden
                                    $("#csag376__csag300_id").val(selecionado_id);
                                    $("#csag376__csag300_email").val(selecionado_email);
                                    this.value = selecionado_value;
                                    return false;
                                }
                            }
                        });
                    });
                
                    $('#btn-SAVE').click(function(){
                        var aEmpresa = $('#csag376__csag308_nr').val();
                        if (aEmpresa == 0 || aEmpresa == '') {
                          jAlert('warning', 'Selecione uma Empresa', 'Atencao', function(r){
                              if (r) {
                                $('#csag376__csag308_nr').select();
                                $('#csag376__csag308_nr').focus();
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
                      if ($('#btn-SAVE').is(':visible')) {
                          $('#btn-SAVE').hide(); 
                      }
                  }
                  else {
                      if ($('#btn-SAVE').is(':visible')) {}
                      else {
                          $('#btn-SAVE').show(); 
                      }
                  }
                    
                    
                  // FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
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
   
   
                
        