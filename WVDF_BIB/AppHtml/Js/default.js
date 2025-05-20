$(document).ready(function(){
	$(".tiptool").tooltip();
	
	$("input[type=text]").addClass("form-control");
	$("select").addClass("form-control");
	
	if(!$("input[type=submit]").hasClass("btn")){
		$("input[type=submit]").addClass("btn").addClass("btn-success");
	}
	if(!$("input[type=button]").hasClass("btn")){
		$("input[type=button]").addClass("btn");
	}
	if(!$("input[type=reset]").hasClass("btn")){
		$("input[type=reset]").addClass("btn");
	}
	
	if($("table").hasClass("ReportTable")){
		$("table").removeClass("ReportTable");
		$("table").addClass("table").addClass("table-striped");
	}
	
	$("div.tbl-header").each(function(){
		$(this).children("table").find("th").removeClass("Header");
		var header = $(this).children("table").find("tr").first().hide().html();
		$(this).children("table").prepend("<thead>"+ header + "</thead>");
	});
	
	$("div.tbl-bordered").find("table").removeClass("table-striped").addClass("table-bordered");
	
});