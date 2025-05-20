document.addEventListener('DOMContentLoaded', function() {
    NgInclude.load([
        "modais/status.html",
        "modais/arquivos.html",
        "modais/mensagens.html",
        "modais/historico.html",
        "modais/negociacao.html",
        "modais/editarTaxa.html",
        "modais/gerarAcordo.html",
        "modais/detalhesAvancados.html",
        "modais/via.html",
        "modais/confirmar.html",
        "modais/netnet.html",
        "modais/abrirNegociacao.html"
    ]);

    Css.cachedLoad([
        "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css",
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
        "https://use.fontawesome.com/releases/v5.2.0/css/all.css",
        "https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.2.0/ng-tags-input.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.2.0/ng-tags-input.bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/angularjs-toaster/2.2.0/toaster.min.css"
    ]);

    Css.load([
        "css/PCGS3004_01.css",
    ]);

    /*Script.cachedLoad([
        "scripts/Url.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.2/angular.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.2/angular-animate.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.2.0/ng-tags-input.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angularjs-toaster/2.2.0/toaster.min.js"
    ]);*/

    /*Script.load([
        "js/ws.js",
        "js/app/app.js",
        "js/app/infoGeralCtrl.js",
        "js/app/taxasCtrl.js",
        "js/app/chatCtrl.js",
        "js/app/mainCtrl.js",
    ]);*/
}, false);