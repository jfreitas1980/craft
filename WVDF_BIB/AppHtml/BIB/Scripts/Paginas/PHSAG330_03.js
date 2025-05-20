$(document).ready(function() {
	$('#div').animate({scrollTop: $('.scroller')[0].scrollHeight}, 120000);
	
	$("#div").hover(
		function() {
			$(".scroller").stop();
		},
		function() {
			$(".scroller").animate({scrollTop: $('.scroller')[0].scrollHeight}, 90000);
		}
	);

	timedRefresh(90000);
});

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}