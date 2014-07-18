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
		var  commission_cost = Math.round(total_income *0.2);
		var  total_cost = parseInt(info.product_cost)+ commission_cost *30 +ship_cost;//twd
		
		
		str += '<ul class="list-group">';
		
		str += '<li class="list-group-item capitalize">平台 = '+info.sell_platform+'</li>';
		str += '<li class="list-group-item list-group-item-success">售價 = '+Math.round(info.product_sellinfo[0][0]*30)+' TWD ( '+info.product_sellinfo[0][0]+' '+currency+' )</li>';
		str += '<li class="list-group-item list-group-item-success">收取運費 = '+Math.round(info.product_sellinfo[0][1]*30)+' TWD ( '+info.product_sellinfo[0][1]+' '+currency+' )</li>';
		str += '<li class="list-group-item list-group-item-danger">成本 = '+parseInt(info.product_cost)+' TWD</li>';
		str += '<li class="list-group-item list-group-item-danger">平台抽成 = '+commission_cost*30+' TWD ( '+commission_cost+' '+currency+' )</li>';
		str += '<li class="list-group-item list-group-item-danger">實際運費 = '+ship_cost+' TWD</li>';
		if((total_income*30-total_cost)<=0){msg='   <span class="label label-danger">虧損</span>';}
		str += '<li class="list-group-item list-group-item-info">預估淨利 = '+Math.round(total_income*30-total_cost)+' TWD'+msg+'</li>';
		str += '<li class="list-group-item">總收入 = '+total_income*30+' TWD</li>';
		str += '<li class="list-group-item">總支出 = '+total_cost+' TWD</li>';
		
		
		//Display Shipping Records
		if	(typeof(info.shipping_record)==='undefined') {
			str  += '<li class="list-group-item">沒有貨運紀錄</li></ul>';
		}
		else{
			str +='</ul>';
			str += '<table id="ship-record-table" class="table table-hover">';
			
			if($('#qs-country').val() == '999'){
			
				str  += '<thead><tr><th>國家</th><th>平均實際運費 (TWD)</th></tr></thead><tbody>';	
				for(var i=0;i<info.shipping_record.length;i++){
					str += '<td>'+info.shipping_record[i][0]+'</td><td> '+info.shipping_record[i][1]+'</td></tr>';
				}				
				
			}
			else{
				str  += '<thead><tr><th>國家</th><th>實際運費 (TWD)</th><th>修改日期</th></tr></thead><tbody>';	
				for(var i=0;i<info.shipping_record.length;i++){
					str += '<td>'+info.shipping_record[i][0]+'</td><td> '+info.shipping_record[i][1]+'</td><td>'+info.shipping_record[i][2]+'</td></tr>';
				}				
			}
			str += '</tbody></table>';
		}
		
		$("#display-result").html(str);
	}
	
	function  displayUpdateRow(active){
		if(typeof(active)==='undefined') {active = true;}
		
		if($('#update-row').is(":hidden") & active){
			$("#update-row").show("slow");
		}
		else if(! active){
			$("#update-row").slideUp("slow");
		}		
	}
	
	//will change package type select
	$("#ia-shipmethod").on("change",function(){
		$.post("code-monkeys.php",$(this).serialize()+'&query=package_type'
			
		).done(function(json){
			initPackageTypeSelector(json);
		});	
	});
	
	function cleanExtraInfo(){
		$('#ei-div').html("");
	}
	
	$("#quick-result-form").on( "submit", function() {
	
		event.preventDefault();
		
		cleanExtraInfo();
		
		$.post("code-monkeys.php",$(this).serialize()+'&query=qs',function(json){
			
			console.log(json);//show response
			var	info = $.parseJSON(json);

			if(info['message']=='ERROR'){
				$("#display-result").html('<p>'+info.code+'</p>');
				displayUpdateRow(false);
			}
			else{
				initShippingProvider( json );
				displayBasicInfo(json);
				
				//assign Quick Result form values to Save This Result form 
				$('#ia-sku').val($('#qs-sku').val());
				$('#ia-shipcost').val($('#qs-shipcost').val());
				$('#ia-seller').val($('#qs-seller :selected').text());
				$('#ia-country').selectpicker('val',$('#qs-country option:selected').val() );
				
				 displayUpdateRow();
			}
		});
	});
	
	function showMsg(msg,type,obj){
	
		var str = '<div class="alert '+type+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+msg+'</div>';
		obj.html(str);
	}
	

	$("#update-shipping-record-form").on( "submit", function() {
		event.preventDefault();
		
		if($('#ia-country').val() == '999'){
			showMsg('請選擇國家Σ(・ω・ノ)ノ','alert-danger',$('#ei-div'));
		}
		else{
			
			$('#ia-submit').prop('disabled',true);
			
			$.post("code-monkeys.php",$(this).serialize()+'&query=ia',function(json){
				console.log(json);
				
				var	info = $.parseJSON(json);//parser json for check operate success or failed
				
				if(info.new_record){
				
					//displayUpdateRow(false);//hide input area
					showMsg('Yes you can!','alert-success',$('#display-result'));//show success msg on display area
				}
				else{
				
					//disable submit button for 3 seconds
					//show error msg on extra info area
				}
				
				setTimeout(function(){ $('#ia-submit').prop('disabled',false); }, 3000);
					
			
				//show msg about this operate
				
			});
			
		}
	});
	
	//active bootstrap-select
	$('.selectpicker').selectpicker();
	
	//What's up doc?
	$('.fa-spin').on('click',function(){

		$(this).toggleClass('fa-spin');

	});
	
});
