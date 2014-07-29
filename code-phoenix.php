<!DOCTYPE html>
<html>
	<head>
		<title>Code Phoenix</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta charset="utf-8"> 
		<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
		<link href="http://fonts.googleapis.com/css?family=Roboto+Condensed:400italic,700italic,400,700|Oswald:400,700" rel="stylesheet">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.5.4/bootstrap-select.min.css" rel="stylesheet">
		<link href="code-phoenix.css" rel="stylesheet">
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.5.4/bootstrap-select.min.js"></script>
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
						<a class="navbar-brand" href="localhost">Code Phoenix Alpha</a>
					</div>
					<div class="navbar-collapse collapse">
						<!-- Left Nav -->
						<ul class="nav navbar-nav">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									Dummy Menu 1
									<b class="caret"></b>
								</a>
								<ul class="dropdown-menu">
									<li><a href="#">About Us</a></li>
									<li><a href="#">Contact</a></li>
								</ul>
							  </li>

							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									Dummy menu
									<b class="caret"></b>
								</a>
								<ul class="dropdown-menu">
									<li><a href="#">TEST1</a></li>
									<li><a href="#">TEST2</a></li>
									<li><a href="#">TEST3</a></li>
									<li class="divider"></li>
									<li class="dropdown-header">Dropdown header test</li>
									<li><a href="#">TEST</a></li>
									<li><a href="#">TEST</a></li>
								</ul>
							</li>             
						</ul>
					</div>
				</div>
			</div>
 
			<div class="container">
			
				<div class="row">
					<!-- input Sku -->
					<div class="col-md-4">
						
						
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
							
							<select id="qs-seller" name="qs-seller" data-style="btn-primary"  class="selectpicker" data-width="100%">	
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
							
							<select name="qs-country" id="qs-country"class="selectpicker" data-style="btn-primary" data-width="100%" data-live-search="true" data-dropup-auto="false">	
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
							
							<button class="btn btn-danger fullwidth" type="submit">Go!</button>
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
								<input id="lp-shipping" name="lp-shipping" type="number" step="0.01" min="0" class="form-control" >
								<span class="input-group-addon currency_tag">[currency]</span>	
							</div>
							<button class="btn btn-danger fullwidth" type="submit">test</button>
						</form>
						
					</div>
					
					<!--Display Area-->
					<div class="col-md-8">
						<h1><i class="fa fa-database fa-fw"></i> Display Info</h1>
						<div class='panel panel-primary'>
							<div  id="display-result" class='panel-body'>
								give me some info yo ლ(╹◡╹ლ)
							</div>
						</div>
					</div>

				</div>
				
				<!--  Update This Result to DB-->
				<div id="update-row" class="row">
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
									<span class="input-group-addon">TWD</span>
									<input id="ia-shipcost" name="ia-shipcost" type="number" class="form-control">			
									<span class="input-group-addon">shipping cost</span>
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
					
					<div class="col-md-8">
						<h1><i class="fa fa-wrench  fa-fw"></i> Modify</h1>
						<ul class="nav nav-pills" role="tablist" id="search-area">
						
							<li class="active"><a href="#sr-tab" role="tab" data-toggle="tab">Shipping Records</a></li>
							<li><a href="#home" role="tab" data-toggle="tab">Seller Accounts</a></li>
							<li><a href="#profile" role="tab" data-toggle="tab">Shipping Providers</a></li>
							<li><a href="#messages" role="tab" data-toggle="tab">Package Types</a></li>
							<li><a href="#settings" role="tab" data-toggle="tab">Settings</a></li>
						</ul>

						<div class="tab-content">
							<div class="tab-pane active" id="sr-tab">
							
								<?php
									//generate  shipping record table
									echo('<table class="table table-hover">');
									
									$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
									mysqli_set_charset ($link ,"utf8");
									$query = 'SELECT sr.id, sr.sku, cl.name, sr.s_cost,  sr.date_modified FROM shipping_record as sr,country_list as cl WHERE sr.country_code =cl.iso_numeric '; 
									$result = mysqli_query($link, $query); 
									while($row = mysqli_fetch_array($result)) { 
										echo('<tr><td>'.$row[0].'</td><td>'.$row[1].'</td><td>'.$row[2].'</td><td>'.$row[3].'</td><td>'.$row[4].'</td></tr>');	
									}
									echo("</table>");
								?>
								
								
							</div>
							<div class="tab-pane" id="home">...</div>
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
			</div>
			
		</div>
	</body>
</html>

<?php
	
?>