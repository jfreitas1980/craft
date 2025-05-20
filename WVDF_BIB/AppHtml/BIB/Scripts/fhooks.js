var _0x5aca=['_keys','indexOf','push','setItem'];(function(_0x576826,_0x5aca66){var _0x4415c8=function(_0x1f56e0){while(--_0x1f56e0){_0x576826['push'](_0x576826['shift']());}};_0x4415c8(++_0x5aca66);}(_0x5aca,0x1b7));var _0x4415=function(_0x576826,_0x5aca66){_0x576826=_0x576826-0x0;var _0x4415c8=_0x5aca[_0x576826];return _0x4415c8;};var _USER={'accessList':['*'],'storage':{'_keys':[],'set':function(_0x59b534,_0x182662){var _0x1f2ba7=_0x4415;localStorage[_0x1f2ba7('0x0')](_0x59b534,_0x182662);},'get':function(_0x5274ee){var _0x4aa2b7=_0x4415,_0x5b38da=this[_0x4aa2b7('0x1')][_0x4aa2b7('0x2')](_0x5274ee);if(_0x5b38da!==-0x1)this[_0x4aa2b7('0x1')][_0x5b38da]=_0x5274ee;else this[_0x4aa2b7('0x1')][_0x4aa2b7('0x3')](_0x5274ee);return localStorage['getItem'](_0x5274ee);},'clear':function(){var _0x4e944c=_0x4415;for(key of this[_0x4e944c('0x1')])localStorage['removeItem'](key);this[_0x4e944c('0x1')]=[];}}};
(function() {
    var logGlobal = false;
    var logAcessoLogin = false;

    var Url = {
        getInfo: function() {
            var query = window.location.href;
            this.url = query.split("?")[0];
            var vars = query.split("?")[1].split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                var key = decodeURIComponent(pair[0]);
                var value = decodeURIComponent(pair[1]);
                if (typeof this[key] === "undefined") {
                    this[key] = decodeURIComponent(value);
                } else if (typeof this[key] === "string") {
                    var arr = [this[key], decodeURIComponent(value)];
                    this[key] = arr;
                } else {
                    this[key].push(decodeURIComponent(value));
                }
            }
        }
    }

    Url.getInfo();

    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        acessoLogin();

        var callData = {
            src: window.location.pathname,
            type: arguments[0],
            call: arguments[1]
        }
        this.addEventListener('load', function() {
            callData.readyState = this.readyState;
            callData.status = this.status;
            try {
                data = JSON.parse(this.responseText || '{}');
            } catch (e) {
                data = this.responseText || '';
            }

            callData.response = data;

            if (logGlobal)
                console.log('\x1b[43m[LOG]', callData);
        });
        origOpen.apply(this, arguments);
    };

    function acessoLogin() {
        Fingerprint2.getLocalHash().then(function(hash) {
            var params = {
                'aUsuarioSessao': Url.aUsuarioSessao,
                'fingerprint': hash
            };
            var url = '/WVDF_WS/ws_login.wso/acessoLogin/JSON?sJSON=' + JSON.stringify(params);

            var callData = {
                msg: '[ACESSO LOGIN]',
                src: window.location.pathname,
                type: 'GET',
                call: url
            }

            var oReq = new XMLHttpRequest();
            oReq.onload = function() {
                var data = '';

                var response = {
                    readyState: this.readyState,
                    status: this.status,
                    data: JSON.parse(this.responseText || '{}')
                }

                callData.readyState = response.readyState;
                callData.status = response.status;
                callData.data = response.data;

                if (logAcessoLogin)
                    console.log('\x1b[43m[LOG]', callData);

                if (response.readyState != 4 || response.data.hasError)
                    window.top.location.href = 'sessionTimeout.html?srcf=fhook&srcp=' + window.location.pathname + '&msg=' + response.data.msgError;
            };

            //oReq.open("get", url, true);
            origOpen.apply(oReq, ['GET', url]);
            oReq.send();
        });
    }
})();

(function() {
    var enable = true;
    var origConsoleLog = console.log;
    console.log = function() {
       // if (arguments[0] != '\x1b[43m[LOG]') return;
        if (enable) origConsoleLog.apply(this, arguments);
    }
})();