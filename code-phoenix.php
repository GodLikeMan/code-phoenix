<!DOCTYPE html>
<html>
	<head>
		<title>Code Phoenix</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta charset="utf-8"> 
		<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
		<link href="http://fonts.googleapis.com/css?family=Roboto+Condensed:400italic,700italic,400,700|Oswald:400,700" rel="stylesheet">
		<link href="lib/bootstrap-select.min.css" rel="stylesheet">
		<link href="//cdn.datatables.net/1.10.2/css/jquery.dataTables.css" rel="stylesheet">
		<link href="//cdn.datatables.net/plug-ins/725b2a2115b/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">
		<link href="lib/bootstrap-dialog.min.css" rel="stylesheet">
		<link href="code-phoenix.css" rel="stylesheet">
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		<script src="lib/bootstrap-select.min.js"></script>
		<script src="lib/jquery.cookie-1.4.1.min.js"></script>
		<script src="//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
		<script src="//cdn.datatables.net/plug-ins/725b2a2115b/integration/bootstrap/3/dataTables.bootstrap.js"></script>
		<script src="lib/bootstrap-dialog.min.js"></script>
		<script src="code-phoenix.js"></script>
	
	</head>
	<body>
		<!-- Wrapper -->
		<div id="wrapper"> 
			<!-- Fixed Navbar -->
			<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<div class="container">
					<!-- Navbar Header -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span class="sr-only">Toggle Navi</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="http://localhost/code-phoenix/code-phoenix.php">Code Phoenix Alpha</a>
					</div>
					<div class="navbar-collapse collapse">
						<!-- Left Nav -->
						<ul class="nav navbar-nav">
							<li>
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									Price Compare
								</a>
							 </li>

							<li>
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									Inventory
								</a>
							<li>             
						</ul>
					</div>
				</div>
			</div>
 
			<div class="container">
			
				<div class="row">
					<!-- input Sku -->
					<div class="col-md-3">
						
						<form class="form-horizontal" id="quick-result-form" role="form" >
							<h1><i id="whatsupdoc" class="fa fa-user-md fa-fw"></i> Quick Result</h1>
							<div class="input-group">
								<span class="input-group-addon">SKU</span>	
								<input id="qs-sku" name="qs-sku" type="text" class="form-control" placeholder="sku input here  (ﾟ∀ﾟ)" required maxlength="8">
							</div>
							<div class="input-group">
								<span class="input-group-addon">shipping cost</span>
								<input id="qs-shipcost" name="qs-shipcost" type="number" value="0"  min="0" class="form-control">
								<span class="input-group-addon">TWD</span>	
							</div>
							
							<select id="qs-seller" name="qs-seller" data-style="btn-inverse"  class="selectpicker" data-width="100%">	
								<option disabled="disabled">Select a Seller</option>
							<?php
								
								$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
								mysqli_set_charset ($link ,"utf8");
								$query = 'SELECT * FROM seller ORDER BY sell_platform'; 
								$result = mysqli_query($link, $query); 
								$group_tag = "";
								while($row = mysqli_fetch_array($result)) { 
								
									if($group_tag!=$row['sell_platform']){
										echo('<optgroup label="'.$row['sell_platform'].'" >');
									}	
									echo('<option value="'.$row['id'].'">'.$row['name']."</option>"); 
									$group_tag=$row['sell_platform'];
									
									if(($group_tag!=$row['sell_platform'])and($group_tag!="")){
										echo('</optgroup>');
									}										
								} 								
							?>
							</select>
							
							<select name="qs-country" id="qs-country"class="selectpicker" data-style="btn-inverse" data-width="100%" data-live-search="true" data-dropup-auto="false">	
								<option value="999">You May Select A Country</option>
								
								<?php
									//generate country selector
									$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
									mysqli_set_charset ($link ,"utf8");
									$query = 'SELECT name,iso_numeric FROM country_list ORDER BY name'; 
									$result = mysqli_query($link, $query); 
									while($row = mysqli_fetch_array($result)) { 
										
										echo '<option value="'.$row[1].'">'.$row[0]."</option>"; 
									} 
								?>
							
							</select>			
							<button class="btn btn-danger fullwidth" type="submit">試算</button>
							<button id="qs-save" class="btn btn-info fullwidth" type="button" style="display: none;" disabled >儲存實際運費和國家</button>
						</form>
						
						<hr>
						<!-- Quick Search For sell price and shipping price-->
						<h3>Listing Price Operator</h3>
						<form class="form-horizontal" id="listing-price-form" role="form" >
							<div class="input-group">
								<span class="input-group-addon">Sell Price</span>	
								<input id="lp-sell-price" name="lp-sell-price" type="number"  step="0.01" min="0" class="form-control" >
								<span  class="input-group-addon currency_tag">[currency]</span>	
							</div>
							<div class="input-group">
								<span class="input-group-addon">Shipping Price</span>	
								<input id="lp-ship-price" name="lp-ship-price" type="number" step="0.01" min="0" class="form-control" >
								<span class="input-group-addon currency_tag">[currency]</span>	
							</div>
							<button id="lp-calc" class="btn btn-danger fullwidth" type="submit">試算</button>
							<button id="lp-save" class="btn btn-info fullwidth" type="button" style="display: none;" disabled>儲存價格</button>
						</form>
					</div>
					
					<!--Display Area-->
					<div class="col-md-9">
						<h1><i class="fa fa-database fa-fw"></i> Display Info</h1>
						<div class='panel panel-primary'>
							<div  id="display-result" class='panel-body'>
								give me some info yo ლ(╹◡╹ლ)
							</div>
						</div>
					</div>
					
				</div>
				
				<!--  Update This Result to DB-->
				<div id="update-row" class="row" >
					<div class="col-md-6">
						<div id="ia-div">
							
							<form class="form-horizontal" id="update-shipping-record-form" >
								<h1 ><i class="fa fa-thumbs-o-up fa-fw"></i> Save This Result</h1>			
								<select name="ia-shipmethod" id="ia-shipmethod" class="selectpicker" data-style="btn-primary" data-width="100%"></select>		
								<select name="ia-package" id="ia-package" class="selectpicker" data-style="btn-primary" data-width="100%"></select>	
								<select name="ia-country" id="ia-country" class="selectpicker" data-style="btn-primary" data-width="100%" data-live-search="true" data-dropup-auto="false">	
									<option value="999">You Must Select A Country</option>								
								<?php
									//generate country selector
									$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
									mysqli_set_charset ($link ,"utf8");
									$query = 'SELECT name,iso_numeric FROM country_list ORDER BY name'; 
									$result = mysqli_query($link, $query); 
									while($row = mysqli_fetch_array($result)) { 
										
										echo '<option value="'.$row[1].'">'.$row[0]."</option>"; 
									} 
								?>				
								</select>
								<div class="input-group">
									<span class="input-group-addon">Seller</span>	
									<input id="ia-seller" name="ia-seller" class="form-control" readonly >
								</div>	
								<div class="input-group">
									<span class="input-group-addon">SKU</span>	
									<input id =  "ia-sku" name="ia-sku" type="text" class="form-control" required maxlength="8" readonly>
								</div>						
								
								<div class="input-group">
									<span class="input-group-addon">shipping cost</span>
									<input id="ia-shipcost" name="ia-shipcost" type="number" value="0"  min="0"  class="form-control">			
									<span class="input-group-addon">TWD</span>	
								</div>
								
								<button id="ia-submit" class="btn btn-danger fullwidth" type="submit">Save and Update</button>
							</form>
						</div>
					</div>
					
					<!-- Extra Info-->
					<div class="col-md-6">
						<h1 ><span class="glyphicon glyphicon-asterisk"></span> Extra Info</h1>
						<div  class="panel panel-info">
							<div  id="ei-div" class='panel-body'></div>
						</div>
						
					</div>
				</div>
				
				<!-- Future Plan -->
				<div class="row">
					<div class="col-md-12">
						<h1><i class="fa fa-wrench  fa-fw"></i> Modify</h1>
						<ul class="nav nav-pills nav-justified" role="tablist" id="search-area">
						
							<li class="active"><a href="#cost-tab" role="tab" data-toggle="tab"><i class="fa fa-cubes"></i> Shipping Records</a></li>
							<li><a href="#product-cost-tab" role="tab" data-toggle="tab">Product Cost</a></li>
							<li><a href="#profile" role="tab" data-toggle="tab">Shipping Providers</a></li>
							<li><a href="#messages" role="tab" data-toggle="tab">Package Types</a></li>
							<li><a href="#settings" role="tab" data-toggle="tab">Settings</a></li>
						</ul>

						<div class="tab-content">
							<div class="tab-pane active" id="cost-tab">
							
								<?php
									//generate  shipping record table
									echo('<table id="mod-cost-table" class="table table-hover datagrid">');
									
									$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
									mysqli_set_charset ($link ,"utf8");
									$query = 'SELECT sr.id, sr.sku, cl.name, sr.s_cost,  sr.date_modified FROM shipping_record as sr,country_list as cl WHERE sr.country_code =cl.iso_numeric '; 
									$result = mysqli_query($link, $query); 
									echo '<thead><tr><td>***</td><td>***</td><td>***</td><td>***</td><td>***</td></tr></thead><tbody>';
									while($row = mysqli_fetch_array($result)) { 
										echo('<tr><td>'.$row[0].'</td><td>'.$row[1].'</td><td>'.$row[2].'</td><td>'.$row[3].'</td><td>'.$row[4].'</td></tr>');	
									}
									echo("</tbody></table>");
								?>
								
								
							</div>
							<div class="tab-pane" id="product-cost-tab">
								<?php
									//generate  product cost table
									echo('<table id="product-cost-table" class="table table-hover datagrid">');
									
									$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
									mysqli_set_charset ($link ,"utf8");
									$query = 'SELECT * FROM product'; 
									$result = mysqli_query($link, $query); 
									echo '<thead><tr><td>Sku</td><td>Short Description</td><td>Cost</td><td>Created Date</td></tr></thead><tbody>';
									while($row = mysqli_fetch_array($result)) { 
										echo('<tr><td>'.$row[0].'</td><td>'.$row[1].'</td><td>'.$row[2].'</td><td>'.$row[3].'</td></tr>');	
									}
									echo("</tbody></table>");				
								?>
							</div>
							<div class="tab-pane" id="profile">...</div>
							<div class="tab-pane" id="messages">...</div>
							<div class="tab-pane" id="settings">...</div>
						</div>
					</div>
				</div>
				
				<!-- Tag System Dev Area -->
				<div class="row">
					<div class="col-md-6">
						<div >
							<form class="form-horizontal" id="tag-operate-form" role="form" >
								<h1><i class="fa fa-bug"></i> Tag System Develop</h1>
								<div class="input-group">
									<span class="input-group-addon">SKU</span>	
									<input id="tag-search" name="tag-search" class="form-control">
								</div>	
								
								<button id="tag-submit" class="btn btn-danger fullwidth" type="submit">Here We Go ~</button>
								
							</form>
						</div>
					</div>
				</div>
				
				<div class="row">
					<div class="col-md-4">
						<h1><span class="glyphicon glyphicon-th-list"></span> Statistic</h1>
						
							<select name="qs-country" class="selectpicker" data-style="btn-info" data-width="100%" data-live-search="true" data-dropup-auto="false">	
								<option value="-1">You May Select A Country</option>
								
								<?php
									//generate country selector
									$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
									mysqli_set_charset ($link ,"utf8");
									$query = 'SELECT name,iso_numeric FROM country_list ORDER BY name'; 
									$result = mysqli_query($link, $query); 
									while($row = mysqli_fetch_array($result)) { 
										
										echo '<option value="'.$row[1].'">'.$row[0]."</option>"; 
									} 
								?>
								
							</select>	
							
						<div class="panel panel-primary">
							<div class="panel-body">

							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</body>
</html>