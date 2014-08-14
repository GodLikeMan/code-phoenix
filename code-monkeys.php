<?php	
	class  CodeMonkeys
	{
		private $works;
		private $data;
		private $info = [ ];
		
		function __construct($post_data) {
			$this->works = $post_data['query'];
			$this->data = $post_data;
		}
		
		public function getProductCost($sku){
			$query = 'SELECT cost,sku FROM product WHERE sku="'.$sku.'"'; 
			$this->searchDB($query,'product_cost','This Sku not found on DB');		
		}
		
		public function getProductSellinfo($sku,$sellerId){
			$query = 'SELECT price,s_price,currency,seller_id FROM product_sellinfo WHERE sku="'.$sku.'" AND seller_id="'.$sellerId.'"';
			$this->searchDB($query,'product_sellinfo','Product Price Error');	
		}
		
		public function	getSellPlatform($sellerId){
			$query = 'SELECT sell_platform FROM seller WHERE id ="'.$sellerId.'"'; 
			$this->searchDB($query,'sell_platform','Sell Platform Error ');
		}
	
		public function	getShippingProvider(){
			$query = 'SELECT id,name FROM tag WHERE category="shipping provider"'; 
			$this->searchDB($query,'shipping_provider','Shipping Provider Error');	
		}
		
		public	function getPackageType(){
		
			$query = 'SELECT id,name FROM tag WHERE category="common package type" OR (category="package type" AND name LIKE "'.$_POST["shipping_provider"].'%")'; 
			$this->searchDB($query,'package_type','Package Type Error');
			
		}
		
		public function getShipRecord($sku,$countryCode){
			
			if($countryCode === '999' ){
				$query 	= 'SELECT cl.name,avg(sr.s_cost)  FROM shipping_record AS sr,country_list AS cl WHERE  sku="'.$sku.'" AND sr.country_code = cl.iso_numeric GROUP BY cl.name ';	
			}
			else{
				$query = 'SELECT sr.id,cl.name,sr.s_cost FROM shipping_record AS sr,country_list AS cl WHERE (sku="'.$sku.'" AND sr.country_code  = "'.$countryCode.'") AND sr.country_code = cl.iso_numeric  ';
			}			
			$this->searchDB($query,'shipping_record',false);			
		}
		
		public function getShipRecordTag($sr_id){
			$query	= 'SELECT tsr.sr_id,t.name,t.category FROM tag as t ,tag_sr_map as tsr WHERE t.id = tsr.t_id AND tsr.sr_id = '.$sr_id;	
			$this->searchDB($query,'sr_tag',false);			
		}
		
		public function saveShipRecord($sku,$countryCode,$shipCost){
			if($countryCode === '999' ){
				die( json_encode(array('message' => 'ERROR', 'code' => '要選擇國家')));
			}
			else{
				$query = 'INSERT INTO shipping_record (sku,country_code,s_cost) VALUES ("'.$sku.'","'.$countryCode.'","'.$shipCost.'")';
				$this->saveToDB($query,'save_ship_record',' Save Ship Record Error');	
			}
			
		}
		
		public function getTagsBySKU($sku){
			$query = 'SELECT tag.id,tag.name,tag.category FROM tag_product_map as tpm,tag  WHERE tpm.t_id = tag.id AND tpm.sku = "'.$sku.'"';
			$this->searchDB($query,'get_product_tag',false);
		}
		
		public function savePriceRecord($sku,$sellerId,$productPrice,$shipPrice,$currency){
			$query	= 'INSERT INTO product_price_record (sku,seller_id,price,s_price,currency) VALUES ("'.$sku.'","'.$sellerId.'","'.$productPrice.'","'.$shipPrice.'","'.$currency.'")';	
			$this->saveToDB($query,'save_price_record','Listing Price Save Error');			
		}
		
		
		public function updateSellInfo($productPrice,$shipPrice,$sku,$sellerId){
			$query	= 'UPDATE product_sellinfo SET price='.$productPrice.',s_price='.$shipPrice.' WHERE sku="'.$sku.'" and seller_id='.$sellerId;		
			$this->saveToDB($query,'update_sell_info','Update Sell Info Error');				
		}
		
		public function getDBLink(){
			$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
			if (mysqli_connect_errno()){ die( json_encode(array('message' => 'ERROR', 'code' => 'DB connect lost! 。゜゜(´□｀。)°゜。')));	}
			mysqli_set_charset ($link ,"utf8");	
			return $link;
		}
		
		public function saveToDB($query,$array_key,$error_msg){
			$link = $this->getDBLink();
			
			if($result = mysqli_query($link, $query)){
				$this->info[$array_key]  = 'success';
			}
			else{  if($error_msg!=false) die( json_encode(array('message' => 'ERROR', 'code' => '◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣')));	}
			
			mysqli_close($link);	
		}
		
		public function searchDB($query,$array_key,$error_msg){
		
			$link = $this->getDBLink();
			
			if($result = mysqli_query($link, $query)){
				if(mysqli_num_rows($result)>0){
					$this->info[$array_key]  =  mysqli_fetch_all($result);
				}
				else{ if($error_msg!=false) die( json_encode(array('message' => 'ERROR', 'code' => $error_msg.' ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣')));	}
			}
			else{  if($error_msg!=false) die( json_encode(array('message' => 'ERROR', 'code' => '◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣')));	}

			mysqli_close($link);	
		}
		
		public function outputJSON(){
			echo json_encode($this->info,JSON_NUMERIC_CHECK);	
			unset($this->info); 
		}
		
		public function monkeyWorks(){
			if($this->works==='qs'){
				$this->getProductCost($_POST['sku']);
				$this->getProductSellinfo($_POST['sku'],$_POST['sellerId']);
				$this->getSellPlatform($_POST['sellerId']);
				$this->getShippingProvider();
			}
			else if ($this->works==='save_price_record') {
				$this->savePriceRecord($_POST['sku'],$_POST['sellerId'],$_POST['productPrice'],$_POST['shipPrice'],$_POST['currency']);
				$this->updateSellInfo($_POST['productPrice'],$_POST['shipPrice'],$_POST['sku'],$_POST['sellerId']);
			}
			else if ($this->works==='save_ship_record') {
				$this->saveShipRecord($_POST['sku'],$_POST['countryCode'],$_POST['shipCost']);
			}
			else if ($this->works==='get_sr'){ 
				$this->getShipRecord($_POST['sku'],$_POST['countryCode']);
			}
			else if ($this->works==='package_type'){
				$this->getPackageType();
			}
			else if($this->works==='tag_search'){
				$this->getTagsBySKU($_POST['sku']);
			}
			else if($this->works === 'sr_tag'){
				$this->getShipRecordTag($_POST['sr_id']);
			}
			else{echo json_encode(array('message' => 'ERROR', 'code' => $_POST['query']));	}
			
			$this->outputJSON();
		}
	}	
	
	$cm = new CodeMonkeys($_POST);
	$cm->monkeyWorks();
?>