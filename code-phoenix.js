$(document).ready(function(){

	$("#quick-result-form").on( "submit", function() {
	
		// show that something is loading
        //$("#display-result").html("<h2>Loading response...</h2>");
		
		$.post("code-monkeys.php",$(this).serialize(),function(data){
			
			 console.log($(this).serialize());
			//show response
			$("#display-result").html(data);

		})
		
		return false;
	});
	
	//active bootstrap-select
	$('.selectpicker').selectpicker();
	
	
});
