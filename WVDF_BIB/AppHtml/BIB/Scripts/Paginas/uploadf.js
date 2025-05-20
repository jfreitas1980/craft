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

    var app = angular.module('uploadfApp', ['toaster']);

    app.directive('ngFileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.ngFileModel);
                var fchange = $parse(attrs.filesChange);
                var isMultiple = attrs.multiple;
                var modelSetter = model.assign;
                element.bind('change', function() {
                    var values = [];
                    console.log("aqui");
                    angular.forEach(element[0].files, function(item) {
                        var value = {
                            name: item.name,
                            size: item.size,
                            sizeKB: (item.size / 1000).toFixed(2),
                            url: URL.createObjectURL(item),
                            _file: item
                        };
                        values.push(value);
                    });

                    scope.$apply(function() {
                        if (isMultiple) {
                            modelSetter(scope, values);
                            fchange(scope, { 'files': values });
                        } else {
                            modelSetter(scope, values[0]);
                            fchange(scope, { 'files': values });
                        }
                    });
                });
            }
        };
    }]);

    app.controller('uploadfCtrl', ['$scope', '$http', 'toaster', function($scope, $http, toaster) {
        $scope.files = [];

        var init = function() {
            Fingerprint2.getLocalHash().then(function(hash) {
                var fp = hash;

                var sJSON = {
                    'aUsuarioSessao': Url.aUsuarioSessao,
                    'aFingerPrint': fp,
                    'aFolder': '',
                    'aExtention': '',
                    'apropostaid': Url.idProposta
                };

                $http.get('../WVDF_WS/ws_fileslist.wso/showfilelist/JSON', { params: { 'sJSON': sJSON } }).then(function(response) {
                    console.log(response.data);
                    var ndata = [];

                    for (var i = 0; i < response.data.length; i++) {
                        var file = {};
                        file.id = response.data[i].id;
                        file.name = response.data[i].value;
                        file.url = response.data[i].url;
                        file.sizeKB = response.data[i].size;
                        ndata.push(file);
                    }

                    $scope.files = $scope.files.concat(ndata);
                });
            });
        }

        function downloadURI(filename, dataUrl) {
            
            var link = document.createElement("a");
            link.download = filename;
            link.target = "_blank";
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            delete link;
        }

        function cloneObj(obj) {
            return JSON.parse(JSON.stringify(obj));
        }

        $scope.download = function(file) {
            downloadURI(file.name, file.url);
        }

        $scope.addFiles = function(files) {
            $scope.files = files.concat($scope.files);
            $("#fileuploadinput").val('');
        }

        $scope.uploadAll = function() {
            for (var i = 0; i < $scope.files.length; i++) {
                $scope.upload(i);
            }
        }

        $scope.cancelAll = function() {
            for (var i = $scope.files.length - 1; i >= 0; i--) {
                $scope.cancel(i);
            }
            console.log($scope.files);
            $("#fileuploadinput").val('');
        }

        $scope.upload = function(index) {
            if ($scope.files[index].id) return;
            Fingerprint2.getLocalHash().then(function(hash) {
                var fp = hash;
                var fd = new FormData();
                fd.append("file", $scope.files[index]._file);
                fd.append('ausuariosessao', Url.aUsuarioSessao);
                fd.append('asize', $scope.files[index].sizeKB);
                fd.append('apropostaid', Url.idProposta);
                fd.append('afingerprint', fp);
                fd.append('atabela', Url.Nm_Tabela);
                fd.append('apasta', aPasta);
                $http({
                    url: '/WVDF_WS/dfEngine/Uploadv3.asp',
                    method: 'POST',
                    data: fd,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                }).then(function(response) {
                    if (!response.data.msg.hasError) {
                        $scope.files[index].id = response.data.id;
                        $scope.files[index].url = response.data.url;
                    }
                });
            });
        }

        $scope.cancel = function(index) {
            if (!$scope.files[index].id)
                $scope.files.splice(index, 1);
        }

        $scope.delete = function(index) {
            Fingerprint2.getLocalHash().then(function(hash) {
                var fp = hash;

                var sJSON = {
                    'aUsuarioSessao': Url.aUsuarioSessao,
                    'aFingerPrint': fp,
                    'aFolder': '',
                    'aFileName': $scope.files[index].name,
                    'apropostaid': Url.idProposta
                };

                $http.get('../WVDF_WS/ws_fileslist.wso/deletefilelist/JSON', { params: { 'sJSON': sJSON } }).then(function(response) {
                    if (!response.data.hasError) {
                        toaster.pop('success', "Sucesso", response.data.msgInfo, null, 'trustedHtml');
                        $scope.files.splice(index, 1);
                    } else {
                        toaster.pop('error', "Erro", response.data.msgError, null, 'trustedHtml');
                    }
                });
            });
        }

        init();
    }]);
