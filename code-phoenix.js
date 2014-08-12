$(document).ready(function(){
	
	//on hover switch views
	$('#search-area a').on('mouseover',function(){   
		event.preventDefault();
		$(this).tab('show');
	});
	
	/*
	*	初始化航運供應商的建置
	*/
	function initShippingProvider(json){
		var	info = $.parseJSON(json);
		var	str ='';
		
		for(var i=0;i<info.shipping_provider.length;i++) {
		
			str += '<option value="'+info.shipping_provider[i][0]+'">'+info.shipping_provider[i][1]+'</option>';
		}
		
		$("#ia-shipmethod").html(str).selectpicker('refresh');
		
		//ajax for package type init
		$.post("code-monkeys.php",{'shipping_provider':$('#ia-shipmethod :selected').text(),'query':'package_type'}
		).done(function(json){
			initPackageTypeSelector(json);
		});
	}
	
	/*
	*	初始化封裝類型選擇建置
	*/
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
	
	/*
	*	貨幣轉換，將參數c依"currencyExchangeRate"(匯率)轉換成新的貨幣值並回傳
	*/
	function currencyConvert(c){
		return (parseFloat(c)*$.cookie('currencyExchangeRate',Number));
	}
	
	/*
	*	添加標籤，參數type選擇類型(可用CSS控制)，參數text為設定內容值
	*/
	function addLabel(type,text){
		return '<span class="label '+type+'">'+text+'</span>';
	}
	
	/*
	*	設定cookies
	*/
	function setCookies(json){
		var	info = $.parseJSON(json);
		
		
		$.cookie('sellPlatform',info.sell_platform);
		$.cookie('productPrice', info.product_sellinfo[0][0].toFixed(2));//售價	
		$.cookie('shipPrice', info.product_sellinfo[0][1].toFixed(2));//收取運費
		$.cookie('currencyExchangeRate', 30);//匯率
		$.cookie('currency',info.product_sellinfo[0][2]);//貨幣
		$.cookie('totalIncome',($.cookie('productPrice',Number)+$.cookie('shipPrice',Number)));//售價加上運費
		$.cookie('commissionCost',($.cookie('totalIncome',Number)*0.2).toFixed(2));//被抽成金額
		$.cookie('productCost',info.product_cost[0][0]);
		$.cookie('totalCost',parseInt(info.product_cost)+currencyConvert($.cookie('commissionCost',Number))+$.cookie('shipCost',Number));//產品成本+被抽成金額*匯率+實際花費運費 (TWD)

	}

	/*
	*	生成基本選項，回傳一個陣列，需要初始化生成
	*/
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
	
	/*
	*	更新基本訊息
	*/
	function updateBasicInfo(info){		
		var label ="";
		
		$('#dbi-sku').html('平台 = '+$.cookie('sellPlatform'));
		$('#dbi-product-price').html('售價 = '+Math.round(info['productPriceExchanged'])+' TWD ( '+info['productPrice']+' )');
		$('#dbi-ship-price').html('收取運費 = '+Math.round(info['shipPriceExchanged'])+' TWD ( '+info['shipPrice']+' )');
		$('#dbi-commission-cost').html('平台抽成 = '+Math.round(info['commissionCostExchanged'])+' TWD ( '+info['commissionCost']+' )');
		$('#dbi-product-cost').html('成本 = '+$.cookie('productCost')+' TWD');
		$('#dbi-ship-cost').html('實際運費 = '+$.cookie('shipCost')+' TWD');
		
		if(arr['profitExchanged']<=0){label = addLabel('label-danger','虧損')}//增加Label 來分辨是否虧損
		
		$('#dbi-profit').html('預估淨利 = '+Math.round(info['profitExchanged'])+' TWD	'+label);
		$('#dbi-total-income').html('總收入 = '+Math.round(info['totalIncomeExchanged'])+' TWD');
		$('#dbi-total-cost').html('總支出 = '+Math.round(info['totalCost'])+' TWD');
		
	}
	
	/*
	*	初始化基本訊息
	*/
	function initBasicInfo(){
		
		$('#display-result').html('<ul id="dbi" class="list-group"></ul>');	
		$('#dbi').append('<li id="dbi-sku" class="list-group-item capitalize"></li>');
		$('#dbi').append('<li id="dbi-product-price" class="list-group-item list-group-item-success" ></li>');
		$('#dbi').append('<li id="dbi-ship-price" class="list-group-item list-group-item-success" ></li>');
		$('#dbi').append('<li id="dbi-product-cost" class="list-group-item list-group-item-danger"></li>');
		$('#dbi').append('<li id="dbi-commission-cost" class="list-group-item list-group-item-danger"></li>');
		$('#dbi').append('<li id="dbi-ship-cost" class="list-group-item list-group-item-danger"></li>');
		$('#dbi').append('<li id="dbi-profit" class="list-group-item list-group-item-info"></li>');
		$('#dbi').append('<li id="dbi-total-income" class="list-group-item"></li>');
		$('#dbi').append('<li id="dbi-total-cost" class="list-group-item"></li>');	
		
		//extra info 
		$('#display-result').append('<ul class="nav nav-pills nav-justified" role="tablist" id="display-result-extra"></ul>');
		$('#display-result-extra').append('<li class="active"><a href="#dbi-shipping-record-tab" role="tab" data-toggle="tab"><i class="fa fa-fw fa-cubes"></i> Shipping Records</a></li>');
		$('#display-result-extra').append('<li><a href="#dbi-price-history-tab" role="tab" data-toggle="tab"><i class="fa fa-fw fa-paw"></i> Price History</a></li>');
		
		$('#display-result').append('<div class="tab-content" id="display-result-extra-content"></div>');
		$('#display-result-extra-content').append('<div class="tab-pane active" id="dbi-shipping-record-tab"></div>');
		$('#display-result-extra-content').append('<div class="tab-pane" id="dbi-price-history-tab"></div>');
	}
	
	/*
	*	初始化基礎 ship 紀錄並建置
	*/
	function initBasicInfoShipRecords(){
		$('#dbi-shipping-record-tab').append( '<table id="ship-record-table" class="table table-hover"><thead></thead><tbody></tbody><table>');
	}

	/*
	*	更新基本ship紀錄
	*/
	function updateBasicInfoShipRecords(){
	
	
		//Display Shipping Records
		
		$.post("code-monkeys.php",{'countryCode':$.cookie('countryCode'),'sku':$.cookie('sku'),'query':'get_sr'},function(json){	
			console.log(json);
			var	info = $.parseJSON(json);
			
			if	(typeof(info.shipping_record)==='undefined') {
				$('#dbi').append('<li id="dbi-no-sr" class="list-group-item">沒有貨運紀錄</li>');
			}
			else{
				$('#dbi-no-sr').remove();//刪除顯示沒有紀錄
				
				if($.cookie('countryCode')==='999') {
					$('#ship-record-table thead').append('<tr><th>國家</th><th>平均實際運費 (TWD)</th></tr>');
					for(var i=0;i<info.shipping_record.length;i++){
						$('#ship-record-table tbody').append( '<tr><td>'+info.shipping_record[i][0]+'</td><td> '+Math.round(info.shipping_record[i][1])+'</td></tr>');				
					}							
				}
				else{
					$('#ship-record-table thead').append('<tr><th>國家</th><th>實際運費 (TWD)</th><th>Shipping Provider</th><th>Package Type</th></tr>');
					
					for(var i=0;i<info.shipping_record.length;i++){
						$('#ship-record-table tbody').append('<tr><tr>');
						
						//get shipping record tags by tag parser
						$.ajax({
						  type: "POST",
						  url: "code-monkeys.php",
						  data: {'sr_id': info.shipping_record[i][0] ,'query':'sr_tag'},
						  async: false
						})
						  .done(function( json ) {
							var	tags = $.parseJSON(json);
							
							$('#ship-record-table tbody').append('<tr><td>'+info.shipping_record[i][1]+'</td><td> '+info.shipping_record[i][2]+'</td></tr>');
							
							if(!(typeof(tags.sr_tag)==='undefined')){
								for(var j=0;j<tags.sr_tag.length;j++){
								
									$('<td>'+tags.sr_tag[j][1]+'</td>').appendTo('#ship-record-table tbody tr:nth-child('+(i+1)+')');
									
									//console.log($('#ship-record-table tbody row').eq(j));
									//.append(tags.sr_tag[j][1]);
									//console.log();
								}	
							}

						  });						
						
					}							
				}
			}
			
			
		});		
		/*
		if	(typeof(info.shipping_record)==='undefined') {
			$('#dbi').append('<li id="dbi-no-sr" class="list-group-item">沒有貨運紀錄</li>');
		}
		else{
			$('#dbi-no-sr').remove();
			
			$('#dbi-shipping-record-tab').append( '<table id="ship-record-table" class="table table-hover"><table>');
			$('#ship-record-table').append('<thead><tr><th>國家</th><th>平均實際運費 (TWD)</th></tr></thead><tbody></tbody>');
			
			
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
		}*/
	}
	
	/*
	*	切換區域
	*/
	function  toggleArea(id,active){
		if(typeof(active)==='undefined') {active = true;}
		
		if($(id).is(":hidden") & active){
			$("#update-row").show("slow");
		}
		else if(! active){
			$(id).slideUp("slow");
		}		
	}
	
	//	will change package type select
	$("#ia-shipmethod").on("change",function(){
		$.post("code-monkeys.php",{'shipping_provider':$('#ia-shipmethod :selected').text(),'query':'package_type'}
			
		).done(function(json){
			initPackageTypeSelector(json);
		});	
	});
	
	/*
	*	清除id = "ei-div"的內容
	*/
	function cleanExtraInfo(){
		$('#ei-div').html("");
	}
	/*
	*	快速的將表單結果分配儲存進去
	*	有產品編號、海外費用、賣家、城鎮
	*/
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
	
	$('#qs-save').on("click",function() {
	
		//disable button for anti-spam
		$('#qs-save').prop('disabled', true).slideToggle();
		
				
		//validate inpu data
		
		//popup hint for saving what data
		
		//save to cookie
		$.cookie('productPrice',$('#lp-sell-price').val() );//售價	
		$.cookie('shipPrice', $('#lp-ship-price').val());//收取運費
		
		//save data to database 
		$.post("code-monkeys.php",{'sku':$.cookie('sku'),'countryCode':$.cookie('countryCode'),'shipCost':$.cookie('shipCost'),'query':'save_ship_record'},function(json){
		
			var	info = $.parseJSON(json);

			if(info['message']=='ERROR'){
				$("#display-result").html('<p>'+info.code+'</p>');
			}
			else{
				//show success msg!
				console.log(info);
			}	
		});		
	});
	
	$("#quick-result-form").on( "submit", function() {
	
		event.preventDefault();
		
		cleanExtraInfo();
		
		//set cookies from form
		$.cookie('sku',$('#qs-sku').val() );	
		$.cookie('countryCode',$('#qs-country option:selected').val() );	
		$.cookie('sellerId',$('#qs-seller :selected').val());
		$.cookie('shipCost', parseInt($('#qs-shipcost').val()));//實際花費運費 (TWD)
		
		
		$.post("code-monkeys.php",{'sellerId':$.cookie('sellerId'),'sku':$.cookie('sku'),'query':'qs'},function(json){
			
			//console.log(json);//show response
			var	info = $.parseJSON(json);

			if(info['message']=='ERROR'){
				$("#display-result").html('<p>'+info.code+'</p>');
				//toggleArea(false);
			}
			else{
			
				//set cookies
				setCookies(json);
				
				//generate BasicInfo Div
				initBasicInfo();
				updateBasicInfo(generateBasicInfoValues());
				initBasicInfoShipRecords();
				updateBasicInfoShipRecords();
				
				//passing values to IA and LP form
				assignIAValue();
				assignLPValue();
				
				//showup hidden div
				initShippingProvider( json );
				//toggleArea('#update-row');
				
				$('#qs-save').prop('disabled', false).slideToggle();
			}
		});
	});
	
	
	$("#listing-price-form").on("submit",function() {
		event.preventDefault();
		
		$.cookie('productPrice',$('#lp-sell-price').val());
		$.cookie('shipPrice',$('#lp-ship-price').val());
		
		updateBasicInfo(generateBasicInfoValues());
		
		$('#lp-save').prop('disabled', false).slideToggle();
	});
	
	//Test for product save
	$('#lp-save').on('click',function(){
	
		//disable button for anti-spam
		$('#lp-save').prop('disabled', true).slideToggle();
				
		//validate inpu data
		
		//save to cookie
		$.cookie('productPrice',$('#lp-sell-price').val() );//售價	
		$.cookie('shipPrice', $('#lp-ship-price').val());//收取運費
		
		//save data to database 
		$.post("code-monkeys.php",{'sku':$.cookie('sku'),'sellerId':$.cookie('sellerId'),'productPrice':$.cookie('productPrice'),'shipPrice':$.cookie('shipPrice'),'currency':$.cookie('currency'),'query':'save_price_record'},function(json){
		
			var	info = $.parseJSON(json);

			if(info['message']=='ERROR'){
				$("#display-result").html('<p>'+info.code+'</p>');
			}
			else{
				//show success msg!
				console.log(info);
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
				//console.log(json);
				
				var	info = $.parseJSON(json);//parser json for check operate success or failed
				
				
		});
	});
	
	//active data table plugin
	$('.datagrid').dataTable();
	
	$('#product-cost-table tbody').on('click', 'td', function(){
		console.log($(this).text());
	});
});
