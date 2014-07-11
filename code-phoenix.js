$(document).ready(function(){

	function initInputShippingRecord(json){
		//JSON.parse
		var	info = $.parseJSON(json);
		var str ='';
		var str2='';
		
		//$("#id-shipmethod").html(info.shipping_provider[0][1]);
		for(var i=0;i<info.shipping_provider.length;i++){
		
			str += '<option value="'+info.shipping_provider[i][0]+'">'+info.shipping_provider[i][1]+'</option>';
		}
		
		
		$("#ia-shipmethod").html(str).selectpicker('refresh');
		
	}
	
	//will change package type select
	$("#ia-shipmethod").on("change",function(){
		console.log($('#ia-shipmethod option:selected').val());
	});
	
	$("#quick-result-form").on( "submit", function() {
	
		event.preventDefault();
		// show that something is loading
        //$("#display-result").html("<h2>Loading response...</h2>");
		
		$.post("code-monkeys.php",$(this).serialize(),function(data){
			//show response
			$("#display-result").html(data);
			initInputShippingRecord( $( data ).find('#respond-json').text() );
		})

	});
	
	//active bootstrap-select
	$('.selectpicker').selectpicker();
	
});
