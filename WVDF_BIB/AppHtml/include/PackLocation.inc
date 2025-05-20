<% if (IdLocation <> "" AND IsNumeric(IdLocation) = false) then %>
    <%
    Dim ArrIdLocation(20), XArrIdLocation, i, n, ItemLocation
    n = 0
    XArrIdLocation = Split(IdLocation, "|")
    For Each i in XArrIdLocation
      ArrIdLocation(n) = Split(i, "=")
      n = n + 1
    Next
    %>
    <script language="JavaScript">
    <!--
    function RowClick(oObj) {
        var Error = new Array();
        if (oObj.getAttribute("RECID") || oObj.getAttribute("ROWID")) {
            <% For Each ItemLocation in ArrIdLocation %>
            <%If IsArray(ItemLocation) then %>
            if (opener.document.getElementById("<%=ItemLocation(1)%>") && oObj) {
                opener.document.getElementById("<%=ItemLocation(1)%>").value = oObj.getAttribute("<%=ItemLocation(0)%>");
            } else {
                Error[Error.length] = 'From: <%=ItemLocation(0)%> or To: <%=ItemLocation(1)%> invalid';
            }
            <% end if %>
            <% Next %>
        } 
        else {
            Error[Error.length] = 'RECID OR ROWID invalid';
        }
        if (Error.length) {
            alert(Error.join('\n'));
        } else {
            window.close();
        }
    }
    // -->
    </script>
<% end if %>