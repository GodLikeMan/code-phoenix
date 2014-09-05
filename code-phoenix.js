$(document).ready(function(){
	
	//on hover switch views
	$('#search-area a').on('mouseover',function() {   
		event.preventDefault();
		$(this).tab('show');
	});
	
	/*
	*	
	*/
	function initShippingProvider(json) {
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
	*	
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
		//console.log(info);
		$.cookie('sellPlatform',info.sell_platform);
		$.cookie('productPrice', info.product_price_record[0][0].toFixed(2));//售價	
		$.cookie('shipPrice', info.product_price_record[0][1].toFixed(2));//收取運費
		$.cookie('currencyExchangeRate', 30);//匯率
		$.cookie('currency',info.product_price_record[0][2]);//貨幣
		$.cookie('totalIncome',($.cookie('productPrice',Number)+$.cookie('shipPrice',Number)));//售價加上運費
		$.cookie('commissionCost',($.cookie('totalIncome',Number)*0.2).toFixed(2));//被抽成金額
		$.cookie('productCost',info.product_cost[0][0]);
		$.cookie('totalCost',parseInt(info.product_cost)+currencyConvert($.cookie('commissionCost',Number))+$.cookie('shipCost',Number));//產品成本+被抽成金額*匯率+實際花費運費 (TWD)
		$.cookie('originProductPrice',$.cookie('productPrice'));
		$.cookie('originShipPrice',$.cookie('shipPrice'));
	}

	/*
	*	
	*/
	function generateBasicInfoValue() {
		
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
	*	
	*/
	function updateBasicInfo(info){		
		var label ="";
		
		$('#dbi-sku').html('<th>平台</th><td>'+$.cookie('sellPlatform')+'</td>');
		$('#dbi-product-price').html('<th>售價 </th><td >'+Math.round(info['productPriceExchanged'])+' TWD ( '+info['productPrice']+' )</td>');
		$('#dbi-ship-price').html('<th>收取運費</th><td>'+Math.round(info['shipPriceExchanged'])+' TWD ( '+info['shipPrice']+' )</td>');
		$('#dbi-product-cost').html('<th>成本</th><td>'+$.cookie('productCost')+' TWD</td>');
		$('#dbi-commission-cost').html('<th>平台抽成 </th><td>'+Math.round(info['commissionCostExchanged'])+' TWD ( '+info['commissionCost']+' )</td>');
		$('#dbi-ship-cost').html('<th>實際運費 </th><td>'+$.cookie('shipCost')+' TWD</td>');
		if(arr['profitExchanged']<=0){label = addLabel('label-danger','虧損')}//增加Label 來分辨是否虧損
		$('#dbi-profit').html('<th>預估淨利 </th><td> '+Math.round(info['profitExchanged'])+' TWD	'+label+'</td>');
		$('#dbi-total-income').html('<th>總收入 </th><td> '+Math.round(info['totalIncomeExchanged'])+' TWD</td>');
		$('#dbi-total-cost').html('<th>總支出 </th><td>'+Math.round(info['totalCost'])+' TWD</td>');
		
	}
	
	/*
	*	
	*/
	function initBasicInfo(){
		
		$('#display-result').html('<table id="dbi" class="table table-hover"><tbody></tbody></table>');
		$('#dbi').append('<tr id="dbi-sku" class="capitalize"></tr>');
		$('#dbi').append('<tr id="dbi-product-price" class="list-group-item-success" ></tr>');
		$('#dbi').append('<tr id="dbi-ship-price" class="list-group-item-success" ></tr>');
		$('#dbi').append('<tr id="dbi-product-cost" class="list-group-item-danger"></tr>');
		$('#dbi').append('<tr id="dbi-commission-cost" class="list-group-item-danger"></tr>');
		$('#dbi').append('<tr id="dbi-ship-cost" class="list-group-item-danger"></tr>');
		$('#dbi').append('<tr id="dbi-profit" class="list-group-item-info"></tr>');
		$('#dbi').append('<tr id="dbi-total-income" ></tr>');
		$('#dbi').append('<tr id="dbi-total-cost" ></tr>');	
		
		initExtraInfo();
	}
	
	
	function initExtraInfo(){
	
		//extra info 
		$('#display-result').append('<ul class="nav nav-pills nav-justified" role="tablist" id="display-result-extra"></ul>');
		$('#display-result-extra').append('<li class="active"><a href="#dbi-ship-record-tab" role="tab" data-toggle="tab"><i class="fa fa-fw fa-cubes"></i> Shipping Records</a></li>');
		$('#display-result-extra').append('<li><a href="#dbi-price-record-tab" role="tab" data-toggle="tab"><i class="fa fa-fw fa-paw"></i> Price History</a></li>');
		
		$('#display-result').append('<div class="tab-content" id="display-result-extra-content"></div>');
		$('#display-result-extra-content').append('<div class="tab-pane active" id="dbi-ship-record-tab"></div>');
		$('#display-result-extra-content').append('<div class="tab-pane" id="dbi-price-record-tab"></div>');
	}
	
	function initExtraInfoPriceRecord(){
		$('#dbi-price-record-tab').append('<table  id="price-record-table" class="table table-hover table-condensed"><thead></thead><tbody></tbody><table>');
	}
	
	function updateExtraInfoPriceRecord(){
		$.post("code-monkeys.php",{'sellerId':$.cookie('sellerId'),'sku':$.cookie('sku'),'query':'get_price_record'},function(json){	
			var info = $.parseJSON(json);
			console.log(json);
			
			$('#price-record-table thead').html('<tr><th data-column-id="id" data-type="numeric"  data-sortable="false" data-visible="false">ID</th><th data-column-id="price">販售價格</th><th data-column-id="shipPrice">收取運費</th><th data-column-id="currency">幣別</th><th data-column-id="dateModified">修改日期</th><th data-column-id="commands" data-formatter="commands" data-sortable="false">Commands</th></tr>');
			
			$('#price-record-table tbody').html("");//clear old data
			
			for(var i = 0;i<info.product_price_record.length;i++){
			
				$('#price-record-table tbody').append('<tr ><td>'+info.product_price_record[i][0]+'</td><td>'+info.product_price_record[i][1]+'</td><td>'+info.product_price_record[i][2]+'</td><td>'+info.product_price_record[i][3]+'</td><td>'+info.product_price_record[i][4]+'</td></tr>');
				
			}
			
		}).done(function(){
				var  price_record_table =$('#price-record-table').bootgrid({
						formatters: {
							"commands": function(column, row) {
								return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\"><i class=\"fa fa-pencil\"></i></button> " + 
											"<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><i class=\"fa fa-trash-o\"></i></button>";
							}
						}
					}).on("loaded.rs.jquery.bootgrid", function(){
							/* Executes after data is loaded and rendered */
							price_record_table.find(".command-edit").on("click", function(e){
							
								alert("You pressed edit on row: " + $(this).data("row-id"));
							}).end().find(".command-delete").on("click", function(e){alert("You pressed delete on row: " + $(this).data("row-id"));});
						});
				});
	}
	
	/*
	*	
	*/
	function initExtraInfoShipRecord(){
		$('#dbi-ship-record-tab').append( '<table id="ship-record-table" class="table table-hover table-condensed"><thead></thead><tbody></tbody><table>');
	}

	/*
	*	更新Basic Info上的運費紀錄
	*/
	function updateExtraInfoShipRecord(){
	
		//Display Shipping Records
		$.post("code-monkeys.php",{'countryCode':$.cookie('countryCode'),'sku':$.cookie('sku'),'query':'get_ship_record'},function(json){	
			var	info = $.parseJSON(json);
			
			$('#ship-record-table thead,#ship-record-table tbody').html("");//clear old data 
			
			if	(typeof(info.shipping_record)==='undefined') {
				$('#dbi').append('<li id="dbi-no-sr" class="list-group-item">沒有貨運紀錄</li>');
			}
			else{
				$('#dbi-no-sr').remove();//刪除顯示沒有紀錄
				
				
				if($.cookie('countryCode')==='999') {
					$('#ship-record-table thead').append('<tr><th data-column-id="country">國家</th><th data-column-id="shipcost">平均實際運費 (TWD)</th></tr>');
					for(var i=0;i<info.shipping_record.length;i++){
						$('#ship-record-table tbody').append( '<tr><td>'+info.shipping_record[i][0]+'</td><td> '+Math.round(info.shipping_record[i][1])+'</td></tr>');				
					}							
				}
				else{
					$('#ship-record-table thead').append('<tr><th data-column-id="id" data-type="numeric"  data-sortable="false" data-visible="false">ID</th><th data-column-id="country">國家</th><th data-column-id="shipcost">運費 (TWD)</th><th data-column-id="shipProvider">貨運商</th><th data-column-id="packageType">包裝</th><th data-column-id="commands" data-formatter="commands" data-sortable="false">Commands</th></tr>');
					
					for(var i=0;i<info.shipping_record.length;i++){
						
						//get shipping record tags by tag parser
						$.ajax({
						  type: "POST",
						  url: "code-monkeys.php",
						  data: {'sr_id': info.shipping_record[i][0] ,'query':'sr_tag'},
						  async: false
						})
						  .done(function( json ) {
							var	tags = $.parseJSON(json);
							
							$('#ship-record-table tbody').append('<tr id="sr-'+i+'"><td>'+info.shipping_record[i][0]+'</td><td>'+info.shipping_record[i][1]+'</td><td> '+info.shipping_record[i][2]+'</td></tr>');
							
							if(!(typeof(tags.sr_tag)==='undefined')){
								for(var j=0;j<tags.sr_tag.length;j++){
								
									$('#sr-'+i).append('<td>'+tags.sr_tag[j][1]+'</td>');
									
								}	
							}
							else{$('#sr-'+i).append('<td></td><td></td>');}
						});						
					}							
				}
			}
		})	.done(function(){
				var ship_record_table = $('#ship-record-table').bootgrid({
					formatters: {
						"commands": function(column, row) {
							return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\"><i class=\"fa fa-pencil\"></i></button> " + 
										"<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><i class=\"fa fa-trash-o\"></i></button>";
						}
					}					
				}).on("loaded.rs.jquery.bootgrid", function(){
						/* Executes after data is loaded and rendered */
						ship_record_table.find(".command-edit").on("click", function(e){
							
							alert("You pressed edit on row: " + $(this).data("row-id"));
						}).end().find(".command-delete").on("click", function(e){alert("You pressed delete on row: " + $(this).data("row-id"));});
					});
			});		
	}
	
	/*
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
	*/
	
	/*
	*	
	*	有產品編號、貨運費用、賣家、國家
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
	
		$('#qs-save').prop('disabled', true);//disable and hide button for anti-spam
	
		//save to cookie
		$.cookie('sku',$('#qs-sku').val());
		$.cookie('countryName',$('#qs-country option:selected').text());
		$.cookie('countryCode',$('#qs-country').val());//國家
		$.cookie('shipCost', $('#qs-shipcost').val());//收取運費
		
		/*
		*	validate inpu data
		*	
		*	Country not selected -> abort and display warning
		*	
		*	沒有搜尋到此sku->	 abort and display warning
		*/
		
		//popup hint for saving what data
		BootstrapDialog.show({
            title: '儲存實際運費到資料庫?',
            message: '<table class="table table-hover"><tr><th>SKU</th><td>'+$.cookie('sku')+'</td></tr><tr><th>國家</th><td>'+$.cookie('countryName')+'</td></tr><tr><th>實際運費</th><td>'+$.cookie('shipCost')+'</td></tr></table>',
            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			closable: true,
			buttons: [{
                label: '確認',
				icon: 'glyphicon glyphicon-send',
				autospin: true,
                action: function(dialogRef) {
				
					dialogRef.enableButtons(false);
					dialogRef.getModalFooter().hide();
					
					//Start AJAX save data to database 
					$.post("code-monkeys.php",{'sku':$.cookie('sku'),'countryCode':$.cookie('countryCode'),'shipCost':$.cookie('shipCost'),'query':'save_ship_record'},function(json){
					
						var	info = $.parseJSON(json);

						if(info['message']=='ERROR'){
							dialogRef.setClosable(true);
							dialogRef.setType(BootstrapDialog.TYPE_DANGER);
							dialogRef.setTitle(info.message);
						}
						else{
							//show success msg!
							dialogRef.setType(BootstrapDialog.TYPE_SUCCESS);
							dialogRef.getModalBody().html('<p>儲存成功!</p>');
							dialogRef.setTitle('2秒後會自動關閉');
							setTimeout(function(){ dialogRef.close(); }, 2000);
						}	
					});					
                }
            }, {
                label: '取消',
				icon: 'glyphicon glyphicon-remove',
                action: function(dialogRef) {
					dialogRef.close();
                }
            }],
            onhidden: function(dialogRef) {// dialogRef will be true if button was click, while it will be false if users close the dialog directly.
                
				setTimeout(function(){  $('#qs-save').prop('disabled', false) }, 2000);
            }
        });

	});
	
	$("#quick-result-form").on( "submit", function() {
	
		event.preventDefault();
		
		$('#display-result').html("");//clean ExtraInfo
		
		//set cookies from form
		$.cookie('sku',$('#qs-sku').val() );	
		$.cookie('countryCode',$('#qs-country option:selected').val() );	
		$.cookie('sellerId',$('#qs-seller :selected').val());
		$.cookie('shipCost', parseInt($('#qs-shipcost').val()));//實際花費運費 (TWD)
		
		
		$.post("code-monkeys.php",{'sellerId':$.cookie('sellerId'),'sku':$.cookie('sku'),'query':'qs'},function(json){
			
			var	info = $.parseJSON(json);

			if(info['message']=='ERROR'){
				$("#display-result").html('<p>'+info.code+'</p>');
				$('#qs-save').prop('disabled', true).slideUp();//disable and hide button for anti-spam
				//toggleArea(false);
			}
			else{
			
				//set cookies
				setCookies(json);
				
				//generate BasicInfo Div
				initBasicInfo();
				updateBasicInfo(generateBasicInfoValue());
				initExtraInfoShipRecord();
				updateExtraInfoShipRecord();
				initExtraInfoPriceRecord();
				updateExtraInfoPriceRecord();
				
				//passing values to IA and LP form
				assignIAValue();
				assignLPValue();
				
				//showup hidden div
				initShippingProvider( json );
				//toggleArea('#update-row');
				
				$('#qs-save').prop('disabled', false).slideDown();//Enable and show the button for saving ship record
			}
		});
	});
	
	
	$("#listing-price-form").on("submit",function() {
		event.preventDefault();
		
		if(($('#lp-sell-price').val() == $.cookie('originProductPrice'))&($('#lp-ship-price').val() == $.cookie('originShipPrice'))){
			console.log('atlas!');
			return false;
		}
		else{
			
			$.cookie('productPrice',$('#lp-sell-price').val());
			$.cookie('shipPrice',$('#lp-ship-price').val());
			
			if ($('#dbi').length >0 ) {//check  the initBasicInfo() function  is triggered or not
				updateBasicInfo(generateBasicInfoValue());
				
				$('#lp-save').prop('disabled', false).slideDown();//Enable and show the button for saving 
			}		
		}
	});
	
	$('#lp-save').on('click',function(){
	
		//validate inpu data
		if(($('#lp-sell-price').val() == $.cookie('originProductPrice'))&($('#lp-ship-price').val() == $.cookie('originShipPrice'))){
			console.log('wwwwtf');
			return false;
		}
		else{
			//save to cookie
			$.cookie('productPrice',$('#lp-sell-price').val());//售價	
			$.cookie('shipPrice', $('#lp-ship-price').val());//收取運費
			
			//save data to database 
			$.post("code-monkeys.php",{'sku':$.cookie('sku'),'sellerId':$.cookie('sellerId'),'productPrice':$.cookie('productPrice'),'shipPrice':$.cookie('shipPrice'),'currency':$.cookie('currency'),'query':'save_price_record'},function(json){
			
				var	info = $.parseJSON(json);

				if(info['message']=='ERROR'){
					BootstrapDialog.show({
						title: 'ERROR',
						message:'<p>'+info.code+'</p>',
						type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
					});
				}
				else{
					//show success msg!
					BootstrapDialog.show({
						title: '儲存成功',
						message: '<table class="table table-hover"><tr><th>SKU</th><td>'+$.cookie('sku')+'</td></tr><tr><th>售價</th><td>'+$.cookie('productPrice')+'</td></tr><tr><th>收取運費</th><td>'+$.cookie('shipPrice')+'</td></tr></table>',
						type: BootstrapDialog.TYPE_SUCCESS, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
						onshown: function(dialogRef){setTimeout(function(){ dialogRef.close(); }, 2000);}
					});
					updateExtraInfoPriceRecord();
					$.cookie('originProductPrice',$.cookie('productPrice'));
					$.cookie('originShipPrice',$.cookie('shipPrice'));
					
				}	
			}).done(function(){
					$('#lp-save').prop('disabled', true).slideUp();//disable button for anti-spam
				});			
		}
	});
	
	function showMsg(msg,type,obj){
	
		var str = '<div class="alert '+type+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+msg+'</div>';
		obj.html(str);
	}
	
	/*
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
	*/
	//active bootstrap-select
	$('.selectpicker').selectpicker();
	
	//What's up doc?
	$('form').on('focusin focusout',function(){
		$(this).children('h1').children('i').toggleClass('fa-spin');
	});
	
	function searchByTag(searchTerm){
		$.post('code-monkeys.php',{'searchTerm':$.cookie('tagSearch'),'query':'tag_search'},function(json){
			console.log(json);
			var info = $.parseJSON(json);
			
			if(info === undefined){
				$('#tag-result-display').html('<h1>ERROR</h1>');
			}
			else{
				//process the result SKUs
				$('#tag-result-display').html('<div id="test-grid" class="row"></div>');
				for(var i = 0;i<info.get_tag_search_result.length;i++){
					
					$('#test-grid').append('<div class="col-xs-12  col-sm-6 col-md-4">'+info.get_tag_search_result[i][0]+'</div>');
					
				}
			}
			//console.log(info.get_tag_search_result.length);
		});
	}
	
	function displayTagSearchResult(){
	}
	
	//search by tag  for showing related products preview
	$('#tag-search-form').on('submit',function(){
		console.log('tag-search-btn');
		
		event.preventDefault();
		
		//hide tag display area
		$('#tag-display').empty().hide();
		//display search terms
		
		$.cookie('tagSearch',$('#tag-search').val().toLowerCase());
		searchByTag($.cookie('tagSearch'));
		console.log($.cookie('tagSearch'));
		//display search result
			
			//have result
			//no result
	});
	
	//search this sku for edit tags and showing info
	$('#tag-sku-search-form').on('submit',function(){
		console.log('tag-sku-search-btn');
		
		event.preventDefault();
		
		//assign value to cookie
		$.cookie('sku',$('#tag-sku-search').val());
		
		$.post("code-monkeys.php",{'sku':$.cookie('sku'),'query':'tag_search_by_sku'},function(json){

			var	info = $.parseJSON(json);
			
			if(info.message === 'ERROR'){
				//showing error dialog
				$('#tag-display').empty().hide();
				$('#tag-result-display').html('<h2>No Result</h2>');
			}
			else{
				//generate tag display
				$('#tag-result-display').html('<div id="tag-display"></div>');
				$('#tag-display').empty().append('<ul id="tag-container"></ul>');
				for(var i = 0; i<info.get_product_tag.length;i++){
					$('#tag-container').append('<li class="tag-link"><a href="#" data-tag-name="'+info.get_product_tag[i][1]+'"><i class="fa fa-tags fa-fw"></i>'+info.get_product_tag[i][1]+'</a></li>');
				}
				$('#tag-container').append('<a id="tag-edit" href="#" class="btn btn-default pull-right">編輯標籤</a>');
				
				//generate tag edit 
				$('#tag-display').append('<div id="tag-editor"></div>');
				$('#tag-editor').append('<table id="tag-editor-table" class="table table-condensed table-hover"><tbody></tbody></table>');
				$('#tag-editor-table tbody:first').append('<tr class="active"><td colspan="2"><form class="form-horizontal"><div class="input-group fullwidth"><input class="form-control" maxlength=30 placeholder="新增標籤"><span class="input-group-btn"><button class="btn btn-inverse">submit</button></span></div></form></td></tr>');
				
				for(var i = 0; i<info.get_product_tag.length;i++){
					if(info.get_product_tag[i] != undefined){
						$('#tag-editor-table tbody:first').append(
							'<tr><td>'+info.get_product_tag[i][1]+'</td><td>'+
							'<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id="tag-id-'+info.get_product_tag[i][0]+'">'+
							'<i class="fa fa-trash-o"></i></button></td></tr>'
						);
					}	
				}
				
				//Search tag with ajax
				$('.tag-link a').on('click',function(){	
					event.preventDefault();
					$.cookie('tagSearch',$(this).data('tagName').toLowerCase());
					searchByTag($.cookie('tagSearch'));
					console.log($.cookie('tagSearch'));
				});
				
				$('#tag-editor').append('<button type="button" id="tag-editor-quit" class="btn btn-info">離開編輯</button>').hide();
				
				//tag edit button triggered
				$('#tag-edit').on('click',function(){
					event.preventDefault();
		
					$('#tag-container').hide();//hide the tags for show up tag edit area
					$('#tag-editor').slideDown("slow");	
				});
				
				//tag edit quit button  triggered
				$('#tag-editor-quit').on('click',function(){
					$('#tag-editor').hide();
					$('#tag-container').fadeIn("slow");	
				});
				
				//ajax delete tag
				$('.command-delete').on('click',function(){
					$.post("code-monkeys.php",{'sku':$.cookie('sku'),'query':'tag_delete'},function(json){
						
					});
				});
				
				$('#tag-display').show();
			}
		});		
		
	});
	
	//active data table plugin
	$('#mod-cost-table , #product-cost-table').bootgrid();
	
	//test
	$('#product-cost-table tbody').on('click', 'td', function(){
		console.log($(this).text());
	});
});
