<?php
echo	"<div class='panel panel-primary'><div class='panel-body'>";
echo	"<p>SKU -> ".$_POST['qs-sku']."</p>";
echo	"<p>Shipping cost -> ".$_POST['qs-shipcost']."</p>";
		print_r($_POST);
echo	"</div></div>";


/*
if quick search only input sku->display the sku detail data
else if quick search filled both fields->display cost by 3 shipping methods
*/
?>