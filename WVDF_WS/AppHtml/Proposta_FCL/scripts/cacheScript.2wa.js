var Script = {
    loaded: false,
    awaitLoad: function(callback, status) { callback(); return;
        if (status == null || status == undefined)
            status = this.loaded;

        if (!status) {
            console.log('waiting');
            window.setTimeout(Script.awaitLoad.bind(null, callback, status), 100);
        } else {
            console.log('done');
            callback();
        }
    },
    load: function(fileArray) {
        var rnd = Math.floor(Math.random() * 80000);
        Script.total = fileArray.lenght;
        fileArray.forEach(function(src) {
            var js = document.createElement('script');
            js.type = "text/javascript";
            js.async = false;
            js.src = src + "?r=" + rnd;
            var first = document.getElementsByTagName('script')[0];
            first.parentNode.insertBefore(js, first);
        });
    },
    cachedLoad: function(fileArray) {
        fileArray.forEach(function(src) {
            var js = document.createElement('script');
            js.type = "text/javascript";
            js.async = false;
            js.src = src;

            var first = document.getElementsByTagName('script')[0];
            first.parentNode.insertBefore(js, first);
        });
    }
};

var Css = {
    load: function(fileArray) {
        var rnd = Math.floor(Math.random() * 80000);
        fileArray.forEach(function(src) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = src + "?r=" + rnd;
            document.head.appendChild(link);
        });
    },
    cachedLoad: function(fileArray) {
        fileArray.forEach(function(src) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

var NgInclude = {
    load: function(fileArray) {
        var rnd = Math.floor(Math.random() * 80000);
        fileArray.forEach(function(src) {
            var link = document.createElement('ng-include');
            link.setAttribute("src", "'" + src + "?r=" + rnd + "'");
            document.body.appendChild(link);
        });
    }
};