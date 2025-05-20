var Script = {
    load: function(fileArray) {
        var rnd = Math.floor(Math.random() * 80000);
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
            document.getElementsByTagName('head')[0].appendChild(link);
        });
    },
    cachedLoad: function(fileArray) {
        fileArray.forEach(function(src) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = src;
            document.getElementsByTagName('head')[0].appendChild(link);
        });
    }
}