<link href="css/base.css" rel="stylesheet" type="text/css" />
<link href="css/reset.css" rel="stylesheet" type="text/css" />
<link href="css/index.css" rel="stylesheet" type="text/css" />
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
<script src="js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="js/bootstrap.js" type="text/javascript"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$("input[placeholder]").each(function(el){
			if($(this).val()==""){
			$(this).val($(this).attr("placeholder")).addClass("placeholder");
			}
			$(this).focus(function(){
				if($(this).val()==$(this).attr("placeholder")){
					$(this).removeClass("placeholder").val("");
				}
			});
			$(this).blur(function(){
				if($(this).val()==""){
					$(this).addClass("placeholder").val($(this).attr("placeholder"));
				}
			});
		});
		$("form").submit(function(){
			$("input[placeholder]").each(function(n,element){
				if($(element).val()==$(element).attr("placeholder")){
					return false;
				}
			});
		});
	});
</script>