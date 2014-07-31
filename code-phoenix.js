$(document).ready(function(){
	
	//on hover switch views
	$('#search-area a').on('mouseover',function(){
		event.preventDefault();
		$(this).tab('show');
	});
	
	//Test for product save
	$('#test-db-save').on('click',function(){
	
		$.post("code-monkeys.php",$(this).serialize()+'&query=update-',function(json){
		
			var	info = $.parseJSON(json);

			if(info['message']=='ERROR'){
				$("#display-result").html('<p>'+info.code+'</p>');
			}
			else{
	
			}
		});		
	});
	
	function initShippingProvider(json){
		var	info = $.parseJSON(json);
		var	str ='';
		
		for(var i=0;i<info.shipping_provider.length;i++){
		
			str += '<option value="'+info.shipping_provider[i][0]+'">'+info.shipping_provider[i][1]+'</option>';
		}
		
		$("#ia-shipmethod").html(str).selectpicker('refresh');
		
		//ajax for package type init
		$.post("code-monkeys.php",{'shipping_provider':$('#ia-shipmethod :selected').text(),'query':'package_type'}
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
	
	function initModifyShippingRecord(){
		
	}
	
	function currencyConvert(c){
		return (parseFloat(c)*$.cookie('currencyExchangeRate',Number));
	}
	
	function addLabel(type,text){
		return '<span class="label '+type+'">'+text+'</span>';
	}
	
	function setCookies(json){
		var	info = $.parseJSON(json);
		
		
		$.cookie('sku',info.product_cost[0][1]);
		$.cookie('sellerId',info.product_sellinfo[0][3]);
		$.cookie('sellPlatform',info.sell_platform);
		$.cookie('productPrice', info.product_sellinfo[0][0].toFixed(2));//售價	
		$.cookie('shipPrice', info.product_sellinfo[0][1].toFixed(2));//收取運費
		$.cookie('currencyExchangeRate', 30);//匯率
		$.cookie('currency',info.product_sellinfo[0][2]);//貨幣
		$.cookie('totalIncome',($.cookie('productPrice',Number)+$.cookie('shipPrice',Number)));//售價加上運費
		$.cookie('commissionCost',($.cookie('totalIncome',Number)*0.2).toFixed(2));//被抽成金額
		$.cookie('productCost',info.product_cost[0][0]);
		$.cookie('totalCost',parseInt(info.product_cost)+currencyConvert($.cookie('commissionCost',Number))+$.cookie('shipCost',Number));//產品成本+被抽成金額*匯率+實際花費運費 (TWD)
		console.log($.cookie());
	}

	
	function generateBasicInfoValues() {
		
		var productPrice = $.cookie('productPrice',Number);
		var shipPrice = $.cookie('shipPrice',Number);
		
		var commissionCost = (productPrice+shipPrice)*0.2
		var commissionCostExchanged = currencyConvert(commissionCost);
		var totalIncome = productPrice+shipPrice;
		var totalIncomeExchanged = currencyConvert(productPrice+shipPrice);
		var totalCost = commissionCostExchanged +$.cookie('shipCost',Number)+$.cookie('productCost',Number);
		var profitExchanged  = currencyConvert(totalIncome) - totalCost;
		
		arr = {
			'productPriceExchanged':currencyConvert(productPrice),
			'productPrice':productPrice+' '+$.cookie('currency'),
			'shipPriceExchanged':currencyConvert(shipPrice),
			'shipPrice':shipPrice+' '+$.cookie('currency'),
			'commissionCostExchanged':commissionCostExchanged ,
			'commissionCost':commissionCost.toFixed(2)+' '+$.cookie('currency'),
			'profitExchanged':profitExchanged ,
			'totalIncomeExchanged':totalIncomeExchanged,
			'totalCost':totalCost
		};
		return arr;
	}
	
	function updateBasicInfo(info){		
		var label ="";
		
		$('#dbi-sku').html('平台 = '+$.cookie('sellPlatform'));
		$('#dbi-product-price').html('售價 = '+info['productPriceExchanged']+' TWD ( '+info['productPrice']+' )');
		$('#dbi-ship-price').html('收取運費 = '+info['shipPriceExchanged']+' TWD ( '+info['shipPrice']+' )');
		$('#dbi-commission-cost').html('平台抽成 = '+Math.round(info['commissionCostExchanged'])+' TWD ( '+info['commissionCost']+' )');
		$('#dbi-product-cost').html('成本 = '+$.cookie('productCost')+' TWD');
		$('#dbi-ship-cost').html('實際運費 = '+$.cookie('shipCost')+' TWD');
		
		if(arr['profitExchanged']<=0){label = addLabel('label-danger','虧損')}//增加Label 來分辨是否虧損
		
		$('#dbi-profit').html('預估淨利 = '+Math.round(info['profitExchanged'])+' TWD	'+label);
		$('#dbi-total-income').html('總收入 = '+Math.round(info['totalIncomeExchanged'])+' TWD');
		$('#dbi-total-cost').html('總支出 = '+Math.round(info['totalCost'])+' TWD');
		
	}
	
	function initBasicInfo(){
		
		$('#display-result').html('<ul id="dbi" class="list-group"></ul>');	
		$('#dbi').append('<li id="dbi-sku" class="list-group-item capitalize"></li>');
		$('#dbi').append('<li id="dbi-product-price" class="list-group-item list-group-item-success" ></li>');
		$('#dbi').append('<li id="dbi-ship-price" class="list-group-item list-group-item-success" ></li>');
		$('#dbi').append( '<li id="dbi-product-cost" class="list-group-item list-group-item-danger"></li>');
		$('#dbi').append('<li id="dbi-commission-cost" class="list-group-item list-group-item-danger"></li>');
		$('#dbi').append('<li id="dbi-ship-cost" class="list-group-item list-group-item-danger"></li>');
		$('#dbi').append('<li id="dbi-profit" class="list-group-item list-group-item-info"></li>');
		$('#dbi').append('<li id="dbi-total-income" class="list-group-item"></li>');
		$('#dbi').append('<li id="dbi-total-cost" class="list-group-item"></li>');	
	}
	
	function tst(){
		//Display Shipping Records
		if	(typeof(info.shipping_record)==='undefined') {
			$('#dbi').append('<li id="dbi-no-sr" class="list-group-item">沒有貨運紀錄</li>');
		}
		else{
			$('#dbi-no-sr').remove();
			
			str += '<table id="ship-record-table" class="table table-hover">';
			
			if($('#qs-country').val() == '999'){
					
				str  += '<thead><tr><th>國家</th><th>平均實際運費 (TWD)</th></tr></thead><tbody>';	
				for(var i=0;i<info.shipping_record.length;i++){
					str +=  '<tr><td>'+info.shipping_record[i][0]+'</td><td> '+info.shipping_record[i][1]+'</td></tr>';				
				}			
			}
			else{
				str  += '<thead><tr><th>國家</th><th>實際運費 (TWD)</th><th>Shipping Provider</th><th>Package Type</th></tr></thead><tbody>';	
				for(var i=0;i<info.shipping_record.length;i++){
					str += '<td>'+info.shipping_record[i][1]+'</td><td> '+info.shipping_record[i][2]+'</td>';
					
					//get shipping record tags by tag parser
					$.ajax({
					  type: "POST",
					  url: "code-monkeys.php",
					  data: {'sr_id': info.shipping_record[i][0] ,'query':'sr_tag'},
					  async: false
					})
					  .done(function( json ) {
						var	tags = $.parseJSON(json);
						//console.log(tags.sr_tag);
						
						for(var j=0;j<tags.sr_tag.length;j++){
							str +=	'<td>'+tags.sr_tag[j][1]+'</td>';
						}						
						
					  });						
					
					str+='</tr>';

				}				
			}
			str += '</tbody></table>';
		}
	}
	
	function  toggleArea(id,active){
		if(typeof(active)==='undefined') {active = true;}
		
		if($(id).is(":hidden") & active){
			$("#update-row").show("slow");
		}
		else if(! active){
			$(id).slideUp("slow");
		}		
	}
	
	//will change package type select
	$("#ia-shipmethod").on("change",function(){
		$.post("code-monkeys.php",{'shipping_provider':$('#ia-shipmethod :selected').text(),'query':'package_type'}
			
		).done(function(json){
			initPackageTypeSelector(json);
		});	
	});
	
	function cleanExtraInfo(){
		$('#ei-div').html("");
	}
	
	function assignIAValue(){
		//assign Quick Result form values to Save This Result form 
		$('#ia-sku').val($.cookie('sku'));
		$('#ia-shipcost').val($.cookie('shipCost'));
		$('#ia-seller').val($.cookie('seller'));
		$('#ia-country').selectpicker('val',$.cookie('countryCode') );	
	}
	
	function assignLPValue(){
		//assign Quick Result form values to Listing Price form
		$('#lp-sell-price').val($.cookie('productPrice'));
		$('#lp-ship-price').val($.cookie('shipPrice'));
		$(".currency_tag").text($.cookie('currency'));
	}
	
	$("#quick-result-form").on( "submit", function() {
	
		event.preventDefault();
		
		cleanExtraInfo();
		
		$.post("code-monkeys.php",$(this).serialize()+'&query=qs',function(json){
			
			//console.log(json);//show response
			var	info = $.parseJSON(json);

			if(info['message']=='ERROR'){
				$("#display-result").html('<p>'+info.code+'</p>');
				toggleArea(false);
			}
			else{
		
				//set cookies
				$.cookie('countryCode',$('#qs-country option:selected').val() );	
				$.cookie('seller',$('#qs-seller :selected').text());
				$.cookie('shipCost', parseInt($('#qs-shipcost').val()));//實際花費運費 (TWD)
				setCookies(json);
				
				//generate BasicInfo Div
				initBasicInfo(json);
				updateBasicInfo(generateBasicInfoValues());
				
				//passing values to IA and LP form
				assignIAValue();
				assignLPValue();
				
				//showup hidden div
				initShippingProvider( json );
				toggleArea('#update-row');
			}
		});
	});
	
	$("#listing-price-form").on("submit",function() {
		event.preventDefault();
		$.cookie('productPrice',$('#lp-sell-price').val());
		$.cookie('shipPrice',$('#lp-ship-price').val());
		
		updateBasicInfo(generateBasicInfoValues());
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
				//console.log(json);
				
				var	info = $.parseJSON(json);//parser json for check operate success or failed
				
				if(info.new_record){
				
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
	$('form').on('focusin focusout',function(){
		$(this).children('h1').children('i').toggleClass('fa-spin');
	});
	
	$("#tag-operate-form").on( "submit", function() {
	
		event.preventDefault();
			
		$.post("code-monkeys.php",$(this).serialize()+'&query=tag_search',function(json){
				console.log(json);
				
				var	info = $.parseJSON(json);//parser json for check operate success or failed
				
				
		});
	});
	
});
