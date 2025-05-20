var Url = {
    getInfo: function() {
        var query = window.location.href;
        this.url = query.split("?")[0];
        var vars = query.split("?")[1].split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            // If first entry with this name
            if (typeof this[key] === "undefined") {
                this[key] = decodeURIComponent(value);
                // If second entry with this name
            } else if (typeof this[key] === "string") {
                var arr = [this[key], decodeURIComponent(value)];
                this[key] = arr;
                // If third or later entry with this name
            } else {
                this[key].push(decodeURIComponent(value));
            }
        }
    }
}

Url.getInfo();