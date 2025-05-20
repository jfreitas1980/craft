
                var jsOK = 1;
                var jaUsuarioSessao;
                var jaParametro;
                
                function formatItem(row) { return row[1]; }
        
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {
                    $('#SelStart5').removeClass('ddEntryCombo');   
                    $('#SelStart4').removeClass('ddEntryCombo');   

                    $('#csag300_ds').addClass('accsag300usuarionome');   
                    $(".accsag300usuarionome").autocomplete({
                        source: function( request, response ) {
                                $.ajax({
                                        url: "/wvdf_cac_8/fbcsag300_usuarionumero.asp",
                                        data: {
                                            aUsuarioSessao: $('#ausuariosessao').val(), 
                                            aCSAG308_NR: $('#SelStart5 option:selected').val(),
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
                            /* START BOLD TERM */
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
                            /* END BOLD TERM */
                        },
                        select: function( event, ui ) {
                            if (ui.item) {
                                var selecionado_id = ui.item.id;
                                var selecionado_value = ui.item.value;
                                var selecionado_label = ui.item.label;
                                //alert('Selecionei o ID ' + selecionado_id + ' = '+selecionado_value);
                                //aqui, o value está em outro input para submit do form, poderá ser hidden
                                $("#SelStart3").val(selecionado_id);
                                this.value = selecionado_value;
                                return false;
                            }
                        }
                    });
                    
                    //blur
                    $('#SelStart3').blur(function(){
                        if ($(this).val()!=0) {
                            var acsag308_nr = $('#SelStart5 option:selected').val();
                            var sRetorno = ReadFuncValue($(this).val()+'","'+acsag308_nr,"oPAG300_01","get_f_pgCSAG300_usuarionome");
                            $('#csag300_ds').val(sRetorno);
                        }
                    });

                    //change
                    // foi implementado para que a classe do autocomplete seja refeita com a empresa selecionada.
                    $('#SelStart5').change(function(){
                        var acsag308_nr = $('#SelStart5 option:selected').val();
                        $(".accsag300usuarionome").autocomplete({
                            source: function( request, response ) {
                                    $.ajax({
                                            url: "/wvdf_cac_8/fbcsag300_usuarionumero.asp",
                                            data: {
                                                aUsuarioSessao: $('#ausuariosessao').val(), 
                                                aCSAG308_NR: $('#SelStart5 option:selected').val(),
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
                                /* START BOLD TERM */
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
                                /* END BOLD TERM */
                            },
                            select: function( event, ui ) {
                                if (ui.item) {
                                    var selecionado_id = ui.item.id;
                                    var selecionado_value = ui.item.value;
                                    var selecionado_label = ui.item.label;
                                    //alert('Selecionei o ID ' + selecionado_id + ' = '+selecionado_value);
                                    //aqui, o value está em outro input para submit do form, poderá ser hidden
                                    $("#SelStart3").val(selecionado_id);
                                    this.value = selecionado_value;
                                    return false;
                                }
                            }
                        });
                    });
                    
                });
   
   
                
        