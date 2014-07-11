<?php	
	$product_cost = 0;
	$product_price = 0;
	
	echo	"<div class='panel panel-primary'><div class='panel-body'>";
	
	$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
	if (mysqli_connect_errno()){echo 'DB connect lost! ( ´•̥̥̥ω•̥̥̥` )';}
	mysqli_set_charset ($link ,"utf8");
	
	$query = 'SELECT cost FROM product WHERE sku="'.$_POST['qs-sku'].'"'; 
	
	if($result = mysqli_query($link, $query)){
		if(mysqli_num_rows($result)>0){
			$row = mysqli_fetch_array($result);
			$product_cost = $row['cost'] ;	
		}
		else{ echo "<p>沒有這SKU ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>";	}
	}
	else{ echo "<p>查詢錯誤 ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>";	}
	

	$query = 'SELECT price FROM product_price WHERE sku="'.$_POST['qs-sku'].'" AND seller_id="'.$_POST['qs-seller'].'"';
echo '<p>'.$query.'</p>';
	if($result = mysqli_query($link, $query)){
		if(mysqli_num_rows($result)>0){
			$row = mysqli_fetch_array($result);
			$product_price = $row[0] ;	
		}
		else{ echo "<p>seller error</p>";	}
	}
	else{ echo "<p>查詢錯誤 ! ◢▆▅崩▄▃▂╰(〒皿〒)╯▂▃▄潰▅▇◣</p>";	}	

	
	echo "<p>成本->".$product_cost."</p>";
	echo "<p>售價->".$product_price."</p>";
	//echo	"<p>SKU -> ".$_POST['qs-sku']."</p>";
	//echo	"<p>Shipping cost -> ".$_POST['qs-shipcost']."</p>";

	print_r($_POST);
	echo	"</div></div>";


/*
if quick search only input sku->display the sku detail data
else if quick search filled both fields->display cost by 3 shipping methods
*/
?>