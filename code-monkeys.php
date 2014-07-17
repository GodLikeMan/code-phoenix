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
			$query = 'SELECT cost FROM product WHERE sku="'.$_POST['qs-sku'].'"'; 
			$this->searchDB($query,'product_cost','This Sku not found on DB');		
		}
		
		public	function getProductSellinfo(){
			$query = 'SELECT price,s_price,currency FROM product_sellinfo WHERE sku="'.$_POST['qs-sku'].'" AND seller_id="'.$_POST['qs-seller'].'"';
			$this->searchDB($query,'product_sellinfo','Product Price Error');	
		}
		
		public function	getSellPlatform(){
			$query = 'SELECT sell_platform FROM seller WHERE id ="'.$_POST['qs-seller'].'"'; 
			$this->searchDB($query,'sell_platform','Sell Platform Error ');
		}
	
		public function	getShippingProvider(){
			$query = 'SELECT id,name FROM shipping_provider'; 
			$this->searchDB($query,'shipping_provider','Shipping Provider Error');	
		}
		
		public	function getPackageType(){
			$query = 'SELECT id,name FROM package_type WHERE sp_id = 0 OR sp_id="'.$_POST['ia-shipmethod'].'"';
			$this->searchDB($query,'package_type','Package Type Error');
		}
		
		public function getShippingRecordInfo(){
			
			$query = 'SELECT cl.name,avg(sr.s_cost)  FROM shipping_record AS sr,country_list AS cl WHERE  sku="'.$_POST['qs-sku'].'" AND sr.country_code = cl.iso_numeric GROUP BY cl.name ';
			$this->searchDB($query,'shipping_record',false);
		}
		
		public function searchDB($query,$array_key,$error_msg){
		
			$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
			if (mysqli_connect_errno()){ die( json_encode(array('message' => 'ERROR', 'code' => 'DB connect lost! 。゜゜(´□｀。)°゜。')));	}
			mysqli_set_charset ($link ,"utf8");	
			
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
			if($this->works==='quicksearch'){
				$this->getShippingProvider();
				$this->getProductCost();
				$this->getProductSellinfo();
				$this->getSellPlatform();
				$this->getShippingRecordInfo();
			}
			else if($this->works==='package_type'){
				$this->getPackageType();
			}
			else{echo json_encode(array('message' => 'ERROR', 'code' => $_POST['query']));	}
			
			$this->outputJSON();
		}
	}	
	
	$cm = new CodeMonkeys($_POST);
	$cm->monkeyWorks();
?>