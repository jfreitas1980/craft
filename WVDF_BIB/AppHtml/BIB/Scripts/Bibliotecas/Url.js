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