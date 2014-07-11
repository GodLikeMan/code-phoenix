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
						<h1><span class="glyphicon glyphicon-fire"></span> Quick Result</h1>
						
						<form class="form-horizontal" id="quick-result-form" role="form" >
							<div class="input-group">
								<span class="input-group-addon">SKU</span>	
								<input name="qs-sku" type="text" class="form-control" placeholder="sku input here  (ﾟ∀ﾟ)" required maxlength="8">
							</div>
							<div class="input-group">
								<span class="input-group-addon">NTD</span>
								
								<input name="qs-shipcost" type="number" class="form-control">
								
								<span class="input-group-addon">shipping cost</span>
							</div>
							
							<select name="qs-seller" class="selectpicker" data-width="100%">	
								<option>Select a Seller</option>
							<?php
								
								$link = mysqli_connect("localhost","ampro","whysoserious","ampro"); 
								mysqli_set_charset ($link ,"utf8");
								$query = 'SELECT * FROM seller GROUP BY sell_platform'; 
								$result = mysqli_query($link, $query); 
								$group_tag = "";
								while($row = mysqli_fetch_array($result)) { 
									if(!($group_tag===$row['sell_platform'])){
										echo('<optgroup label="'.$row['sell_platform'].'" >');
									}	
									echo('<option value="'.$row['id'].'">'.$row['name']."</option>"); 
									if(!($group_tag===$row['sell_platform'])){
										echo('</optgroup>');
										$group_tag=$row['sell_platform'];
									}										
								} 								
							?>
							</select>
							
							<button class="btn btn-danger fullwidth" type="submit">Go!</button>
						</form>
					</div>
					
					<div class="col-md-8">
						<h1><span class="glyphicon glyphicon-flash"></span> Display</h1>
						<div id="display-result">give me some info yo ლ(╹◡╹ლ)</div>
					</div>

				</div>
				
				<!-- Insert Area-->
				<div class="row">
					<div class="col-md-6">
						<h1 ><span class="glyphicon glyphicon-tower"></span> Save This Result</h1>
						<form class="form-horizontal" id="insert-data-form" >
						
							<div class="input-group">
								<span class="input-group-addon">SKU</span>	
								<input name="ia-sku" type="text" class="form-control" required maxlength="8">
							</div>		
													
							<select name="ia-shipmethod" id="ia-shipmethod" class="selectpicker" data-style="btn-info" data-width="100%"></select>		
							<select name="ia-package" id="ia-package" class="selectpicker" data-style="btn-info" data-width="100%"></select>	
							
							<div class="input-group">
								<span class="input-group-addon">NTD</span>
								<input name="ia-shipcost" type="number" class="form-control">			
								<span class="input-group-addon">shipping cost</span>
							</div>
						
					</div>
				</div>
				
				<!-- Future Plan -->
				<div class="row">
					<div class="col-md-4">
						<h1><span class="glyphicon glyphicon-th-list"></span> Statistic</h1>
						
							<select name="qs-country" class="selectpicker" data-style="btn-info" data-width="100%" data-live-search="true" data-dropup-auto="false">	
								<option disabled="disabled">Country List</option>
								
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
						<h1><span class="glyphicon glyphicon-wrench"></span> Modify</h1>
						<ul class="nav nav-pills" role="tablist" id="search-area">
							<li class="active"><a href="#home" role="tab" data-toggle="tab">Seller Accounts</a></li>
							<li><a href="#profile" role="tab" data-toggle="tab">Shipping Providers</a></li>
							<li><a href="#messages" role="tab" data-toggle="tab">Package Types</a></li>
							<li><a href="#settings" role="tab" data-toggle="tab">Settings</a></li>
						</ul>

						<div class="tab-content">
							<div class="tab-pane active" id="home">...</div>
							<div class="tab-pane" id="profile">...</div>
							<div class="tab-pane" id="messages">...</div>
							<div class="tab-pane" id="settings">...</div>
						</div>
					</div>
				</div>
				
			</div>
			
		</div>
	</body>
</html>

<?php
	
?>