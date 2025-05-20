$(document).ready(function () {
	$('#search').multiselect({
		search: {
			left: '<input type="text" name="q" class="form-control" placeholder="..." />',
			right: '<input type="text" name="q" class="form-control" placeholder="..." />',
		}
	});
});
