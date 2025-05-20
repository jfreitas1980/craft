<%
FUNCTION SortArray(aSort, intAsc)
	Dim intTempStore
	Dim i, j 
	For i = 0 To UBound(aSort) - 1
	For j = i To UBound(aSort)
	'Sort Ascending
	if intAsc = 1 Then
	if aSort(i) > aSort(j) Then
	intTempStore = aSort(i)
	aSort(i) = aSort(j)
	aSort(j) = intTempStore
	End if 'i > j
	'Sort Descending
	Else
	if aSort(i) < aSort(j) Then
	intTempStore = aSort(i)
	aSort(i) = aSort(j)
	aSort(j) = intTempStore
	End if 'i < j
	End if 'intAsc = 1
	Next 'j
	Next 'i
	fnSort = aSort
END FUNCTION 'fnSort
%>