<?php	
	$info = array(
		'product_cost'			=>	0,
		'product_price'			=>	0,
		'sell_platform'			=>	"",
		'shipping_provider'	=>	array()
	);
	

	echo	"<div class='panel panel-primary'><div class='panel-body'>";
	
	$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
	if (mysqli_connect_errno()){die('DB connect lost! 。゜゜(´□｀。)°゜。');}
	mysqli_set_charset ($link ,"utf8");
	
	$query = 'SELECT cost FROM product WHERE sku="'.$_POST['qs-sku'].'"'; 
	
	if($result = mysqli_query($link, $query)){
		if(mysqli_num_rows($result)>0){
			$row = mysqli_fetch_row($result);
			$info['product_cost'] = $row[0] ;	
		}
		else{ die("<p>沒有這SKU ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>");	}
	}
	else{ die("<p>查詢錯誤 ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>");	}
	

	
	$query = 'SELECT price FROM product_price WHERE sku="'.$_POST['qs-sku'].'" AND seller_id="'.$_POST['qs-seller'].'"';

	if($result = mysqli_query($link, $query)){
		if(mysqli_num_rows($result)>0){
			$row = mysqli_fetch_row($result);
			$info['product_price'] = $row[0] ;	
		}
		else{ die("<p>seller error</p>");	}
	}
	else{ die("<p>查詢錯誤 ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>");	}	
	
	
	
	$query = 'SELECT sell_platform FROM seller WHERE id ="'.$_POST['qs-seller'].'"'; 
	
	if($result = mysqli_query($link, $query)){
		if(mysqli_num_rows($result)>0){
			$row = mysqli_fetch_row($result);
			$info['sell_platform'] = $row[0] ;	
		}
		else{ die("<p>sell platform error</p>");	}
	}
	else{ die("<p>查詢錯誤 ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>");	}	
	
	
	
	$query = 'SELECT id,name FROM shipping_provider'; 
	
	if($result = mysqli_query($link, $query)){
		if(mysqli_num_rows($result)>0){
		
			$row = mysqli_fetch_all($result);
			$info['shipping_provider'] = $row;
	
		}
		else{ die("<p>shipping provider error</p>");	}
	}
	else{ die("<p>查詢錯誤 ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>");	}	

	
	
	
	$query = 'SELECT * FROM package_type'; 
	
	if($result = mysqli_query($link, $query)){
		if(mysqli_num_rows($result)>0){
		
			$row = mysqli_fetch_all($result);
			$info['package_type'] = $row;
	
		}
		else{ die("<p>package type error</p>");	}
	}
	else{ die("<p>查詢錯誤 ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>");	}		
	
	
	
	echo "<p>成本->".$info['product_cost']."</p>";
	echo "<p>售價->".$info['product_price']."</p>";
	echo "<p>平台->".$info['sell_platform']."</p>";

	//print_r($_POST);
	print_r($info);
	echo '<p id="respond-json">'.json_encode($info,JSON_NUMERIC_CHECK).'</p>';
	echo	"</div></div>";
	

/*
if quick search only input sku->display the sku detail data
else if quick search filled both fields->display cost by 3 shipping methods
*/
?>