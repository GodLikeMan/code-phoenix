$(document).ready(function(){

	function initShippingProvider(json){

		var	info = $.parseJSON(json);
		var	str ='';
	
		for(var i=0;i<info.shipping_provider.length;i++){
		
			str += '<option value="'+info.shipping_provider[i][0]+'">'+info.shipping_provider[i][1]+'</option>';
		}

		$("#ia-shipmethod").html(str).selectpicker('refresh');
		
		//ajax for package type init
		$.post("code-monkeys.php",{'ia-shipmethod':1,'query':'package_type'}
		).done(function(json){
			initPackageTypeSelector(json);
		});
	}
	
	function initPackageTypeSelector(json){
		//console.log(json);
		var	info = $.parseJSON(json);
		var	str ='';		
		
		for(var i=0;i<info.package_type.length;i++){
			str += '<option value="'+info.package_type[i][0]+'">'+info.package_type[i][1]+'</option>';	
		}	
		
		$("#ia-package").html(str).selectpicker('refresh');
	}
	
	function displayBasicInfo(json){
		var  info = $.parseJSON(json);
		var  str ='';	
		var  msg ='';
		
		var  currency = info.product_sellinfo[0][2];
		var  ship_cost = parseInt($('#qs-shipcost').val());//twd
		var  total_income = (info.product_sellinfo[0][0]+info.product_sellinfo[0][1]);
		var  commission_cost = Math.round(total_income *0.15);
		var  total_cost = parseInt(info.product_cost)+ commission_cost *30 +ship_cost;//twd
		
		
		str += '<ul class="list-group">';
		
		str += '<li class="list-group-item">平台 = '+info.sell_platform+'</li>';
		str += '<li class="list-group-item list-group-item-success">售價 = '+Math.round(info.product_sellinfo[0][0]*30)+' TWD ( '+info.product_sellinfo[0][0]+' '+currency+' )</li>';
		str += '<li class="list-group-item list-group-item-success">收取運費 = '+Math.round(info.product_sellinfo[0][1]*30)+' TWD ( '+info.product_sellinfo[0][1]+' '+currency+' )</li>';
		str += '<li class="list-group-item list-group-item-danger">成本 = '+parseInt(info.product_cost)+' TWD</li>';
		str += '<li class="list-group-item list-group-item-danger">平台抽成 = '+commission_cost*30+' TWD ( '+commission_cost+' '+currency+' )</li>';
		str += '<li class="list-group-item list-group-item-danger">實際運費 = '+ship_cost+' TWD</li>';
		if((total_income*30-total_cost)<=0){msg='   <span class="label label-danger">虧損</span>';}
		str += '<li class="list-group-item list-group-item-info">預估淨利 = '+Math.round(total_income*30-total_cost)+' TWD'+msg+'</li>';
		str += '<li class="list-group-item">總收入 = '+total_income*30+' TWD</li>';
		str += '<li class="list-group-item">總支出 = '+total_cost+' TWD</li>';
		
		if	(typeof(info.shipping_record)==='undefined') {
			str  += '<li class="list-group-item">沒有貨運紀錄</li></ul>';
		}
		else{
			str +='</ul>';
			str += '<table class="table table-hover">';
			str  += '<tr><th>Country</th><th>平均貨運費用 (TWD)</th></tr>';	
			for(var i=0;i<info.shipping_record.length;i++){

				str += '<td>'+info.shipping_record[i][0]+'</td><td> '+info.shipping_record[i][1]+'</td></tr>';
				//str += '<p>貨運商 code = '+info.shipping_record[i][2]+'</p>';
			}
			str += '</table>';
		}
		
		$("#display-result").html(str);
		
	}
	
	
	function	displayInputArea(active){
		
		if(typeof(active)==='undefined') {active = true;}
		
		if($('#ia-div').is(":hidden") & active){
			$("#ia-div").show("slow");
		}
		else if(! active){
			$("#ia-div").slideUp();
		}
	}
	
	//will change package type select
	$("#ia-shipmethod").on("change",function(){
		$.post("code-monkeys.php",$(this).serialize()+'&query=package_type'
			
		).done(function(json){
			initPackageTypeSelector(json);
		});	
	});
	
	$("#quick-result-form").on( "submit", function() {
	
		event.preventDefault();
		
		$.post("code-monkeys.php",$(this).serialize()+'&query=quicksearch',function(json){
			//show response
			console.log(json);
			var	info = $.parseJSON(json);

			if(info['message']=='ERROR'){
				$("#display-result").html('<p>'+info.code+'</p>');
				displayInputArea(false);
			}
			else{
				initShippingProvider( json );
				displayBasicInfo(json);
				
				//assign Quick Result form values to Save This Result form 
				$('#ia-sku').val($('#qs-sku').val());
				$('#ia-shipcost').val($('#qs-shipcost').val());
				$('#ia-country').selectpicker('val',$('#qs-country option:selected').val() );
				
				displayInputArea();
			}
		});
	});
	
	//active bootstrap-select
	$('.selectpicker').selectpicker();
	
});
