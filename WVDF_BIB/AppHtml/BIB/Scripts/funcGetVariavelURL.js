function getVariavelURL(variavel)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variavel) {
            return pair[1];
        }
    }
    return(false);
}

function getVariavelURL2(variavel)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variavel) {
            var iPos = vars[i].indexOf("=");
            return vars[i].substr(iPos + 1 );
        }
    }
    return("");
}