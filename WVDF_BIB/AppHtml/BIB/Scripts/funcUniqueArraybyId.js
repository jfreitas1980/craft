function UniqueArraybyId(collection, keyname) {
    var output = [], keys = [];

    angular.forEach(collection, function (item) {
        var key = item[keyname];
        if (keys.indexOf(key) === -1) {
            keys.push(key);
            output.push(item);
        }
    });
    output = sortByKey(output, keyname);
    return output;
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}