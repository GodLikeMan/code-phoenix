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
		
		public function getProductCost(){
			$query = 'SELECT cost,sku FROM product WHERE sku="'.$_POST['qs-sku'].'"'; 
			$this->searchDB($query,'product_cost','This Sku not found on DB');		
		}
		
		public	function getProductSellinfo(){
			$query = 'SELECT price,s_price,currency,seller_id FROM product_sellinfo WHERE sku="'.$_POST['qs-sku'].'" AND seller_id="'.$_POST['qs-seller'].'"';
			$this->searchDB($query,'product_sellinfo','Product Price Error');	
		}
		
		public function	getSellPlatform(){
			$query = 'SELECT sell_platform FROM seller WHERE id ="'.$_POST['qs-seller'].'"'; 
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
		
		public function getShippingRecordInfo($country){
			
			if($country === '999' ){
				$query 	= 'SELECT cl.name,avg(sr.s_cost)  FROM shipping_record AS sr,country_list AS cl WHERE  sku="'.$_POST["qs-sku"].'" AND sr.country_code = cl.iso_numeric GROUP BY cl.name ';	
			}
			else{
				$query = 'SELECT sr.id,cl.name,sr.s_cost FROM shipping_record AS sr,country_list AS cl WHERE (sku="'.$_POST['qs-sku'].'" AND sr.country_code  = "'.$country.'") AND sr.country_code = cl.iso_numeric ORDER BY sr.date_modified LIMIT 5 ';
			}			
			$this->searchDB($query,'shipping_record',false);			
		}
		
		public function getShippingRecordTag($sr_id){
			$query	= 'SELECT tsr.sr_id,t.name,t.category FROM tag as t ,tag_sr_map as tsr WHERE t.id = tsr.t_id AND tsr.sr_id = '.$sr_id;	
			$this->searchDB($query,'sr_tag',false);			
		}
		
		public function insertShippingRecordInfo(){
			$query = 'INSERT INTO shipping_record (sku,country_code,s_cost,s_provider) VALUES ("'.$_POST['ia-sku'].'","'.$_POST['ia-country'].'","'.$_POST['ia-shipcost'].'","'.$_POST['ia-shipmethod'].'" )';
			$link = $this->getDBLink();
			
			if($result = mysqli_query($link, $query)){
	
				$this->info['new_record']  =  $result;

			}		
			mysqli_close($link);	
		}
		
		public function getTagsBySKU($sku){
			$query = "SELECT tag FROM tag_product_map";
			//$this->searchDB($query,'shipping_record',false);
		}
		
		public function getDBLink(){
			$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
			if (mysqli_connect_errno()){ die( json_encode(array('message' => 'ERROR', 'code' => 'DB connect lost! 。゜゜(´□｀。)°゜。')));	}
			mysqli_set_charset ($link ,"utf8");	
			return $link;
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
				$this->getProductCost();
				$this->getProductSellinfo();
				$this->getSellPlatform();
				
				$this->getShippingProvider();
				$this->getShippingRecordInfo($_POST['qs-country']);
			}
			else if ($this->works==='ia'){
				$this->insertShippingRecordInfo();
			}
			else if ($this->works==='package_type'){
				$this->getPackageType();
			}
			else if($this->works==='tag_search'){
				$this->getTagsBySKU($_POST['tag-search']);
			}
			else if($this->works === 'sr_tag'){
				$this->getShippingRecordTag($_POST['sr_id']);
			}
			else{echo json_encode(array('message' => 'ERROR', 'code' => $_POST['query']));	}
			
			$this->outputJSON();
		}
	}	
	
	$cm = new CodeMonkeys($_POST);
	$cm->monkeyWorks();
?>