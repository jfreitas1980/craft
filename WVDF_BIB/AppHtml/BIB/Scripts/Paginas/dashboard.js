// FORMATA A PAGINA
$(document).ready(function() {
    $.get("/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&sPrograma=pcgs3000_00", function(data) {
        var lang = 'pt-br';

        if(data.IDIOMA == 1)
            lang = 'pt-br';
        else if (data.IDIOMA == 2) 
            lang = 'en';
        else if (data.IDIOMA == 3)
            lang = 'es';


        Calendario(lang);
        $('#user_id').blur(function() {
            Calendario(lang);
        });
    });

    $.get("/WVDF_WS/ws_csag308.wso/f_fup_csag308_combo/JSON?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&sCONTEUDO=" + '' + "&Cliente=" + getVariavelURL('idCliente'), function(data) {
        const select = document.getElementById("lstFiltroMarcas");

        for(let i = 0; i < data.length; i++) {
            let opt = data[i];
            let el = document.createElement("option");
            el.textContent = opt.DS;
            el.value = opt.ID;
            select.appendChild(el);
        }
    });

    $.get("/WVDF_WS/ws_csag300.wso/f_csag300_TagCombo/JSON?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&sCONTEUDO=" + '', function(data) {
        const select = document.getElementById("lstFiltroUsuarios");

        for(let i = 0; i < data.length; i++) {
            let opt = data[i];
            let el = document.createElement("option");
            el.textContent = opt.DS;
            el.value = opt.ID;
            select.appendChild(el);
        }
    });

});


function Calendario(lang, marca_id) {
    $('#mCalendario').fullCalendar({
        header: {
            left: 'prev,next today',
            right: 'month,agendaWeek,basicDay,listWeek',
            center: 'title'
        },
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        views: {
            month: {
                eventLimit: 6
            }
        },
        locale: lang,
        events: {
            url: 'fbcgs2101_schedule.asp',
            data: {
                aUsuarioSessao: $('#jaUsuarioSessao').val(),
                User: $('#user_id').val(),
                aMarca: 0,
                Acao: $('#acao_id').val()
            },
            success: function(data) {
                console.log(data);
            },
            error: function() {
                console.log('there was an error while fetching events!');
            },
            color: '#cecece', // a non-ajax option
            textColor: 'black' // a non-ajax option
        },
        dayClick: function(date, jsEvent, view) {
            var dataIso = date.format();
            var data = dataIso.substr(8, 2) + "/" + dataIso.substr(5, 2) + "/" + dataIso.substr(0, 4);

            parent.jaddTab('FOLLOW ' + data, 'FUP2/FUP.html?aUsuarioSessao=' + $('#jaUsuarioSessao').val() + '&Data=' + data);
        },
        eventClick: function(calEvent, jsEvent, view) {
            var text = calEvent.title;
            if (calEvent.icon)
                text = '<i class="fa fa-' + calEvent.icon + '" aria-hidden="true"></i>: ' + text;

            parent.jaddTab(text, calEvent.url);
            return false;

            // parent.addTab(calEvent.title, calEvent.url);
            // return false;
        },
        eventRender: function(jsEvent, view) {

            var title = jsEvent.title;

            if (jsEvent.cancelada)
                title = "<del>" + title + "</del>"

            if (jsEvent.icon)
                view.find(".fc-title").prepend('<i class="fa fa-' + jsEvent.icon + '" aria-hidden="true"></i>: ' + title);

            view.find(".fc-title").html(title);
            // view.find(".fc-list-item-title").html('<i class="fa fa-' + jsEvent.icon + '" aria-hidden="true"></i>: ' + jsEvent.title);

        }

    });

    $('#mCalendario').fullCalendar('today');

}

function aplicarFiltro() {
    const events = {
        url: 'fbcgs2101_schedule.asp',
        data: {
            aUsuarioSessao: $('#jaUsuarioSessao').val(),
            User: $('#user_id').val(),
            aMarca: document.getElementById("lstFiltroMarcas").value,
            aElab: document.getElementById("lstFiltroUsuarios").value,
        },
        success: function(data) {
            console.log(data);
        },
        error: function() {
            console.log('there was an error while fetching events!');
        },
        color: '#cecece', // a non-ajax option
        textColor: 'black' // a non-ajax option
    }
    $('#mCalendario').fullCalendar('removeEventSource', events);
    $('#mCalendario').fullCalendar('addEventSource', events);
    //$('#modalFiltroCalendario').modal('hide');
}

// AUTOCOMPLETE CLIENTE
$(function() {
    $("#user_ds").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "fbcsag300_usuarios.asp",
                data: {
                    aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
                    term: retiraAcento(request.term)
                },
                dataType: "json",
                success: function(data) {
                    response(data);
                }
            });
        },
        minLength: 2,
        open: function(e, ui) {
            var termTemplate = '<strong>%s</strong>';
            var acData = $(this).data('uiAutocomplete');
            acData
                .menu
                .element
                .find('a')
                .each(function() {
                    var me = $(this);
                    var regex = new RegExp(acData.term, "gi");
                    me.html(me.text().replace(regex, function(matched) {
                        return termTemplate.replace('%s', matched);
                    }));
                });
        },
        select: function(event, ui) {
            if (ui.item) {
                $('#user_id').val(ui.item.id);
                $('#user_ds').val(ui.item.value);
                return false;
            }
        }
    }).autocomplete("instance")._renderItem = function(ul, item) {
        return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
    };
});