<!DOCTYPE html>
<html>
	<head>
		<title>Code Phoenix</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
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
								<input name="qs-sku" type="text" class="form-control" placeholder="sku input here  (ﾟ∀ﾟ)" required maxlength="4">
							</div>
							<div class="input-group">
								<span class="input-group-addon">NTD</span>
								
								<input name="qs-shipcost" type="number" class="form-control">
								
								<span class="input-group-addon">shipping cost</span>
							</div>
							<select name="qs-account" class="selectpicker" data-style="btn-info" data-width="100%">	
								<option>All Account</option>
								<optgroup label="Ebay">
									<option>account1</option>
									<option>account2</option>
									<option>account3</option>
								</optgroup>
								<optgroup label="Amazon">
									<option>account1</option>
									<option>account2</option>
									<option>account3</option>
								</optgroup>								
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
						<h1 ><span class="glyphicon glyphicon-tower"></span> Insert Data</h1>
						<form class="form-horizontal" id="insert-data-form" >
						
							<div class="input-group">
								<span class="input-group-addon">SKU</span>	
								<input name="id-sku" type="text" class="form-control" required maxlength="4">
							</div>		
													
							<select name="id-shipmethod" class="selectpicker" data-style="btn-info" data-width="100%">							
								<option>EMS</option>
								<option>Fedex</option>
								<option>DHL</option>
							</select>							
							
							<div class="input-group">
								<span class="input-group-addon">NTD</span>
								<input name="id-shipcost" type="number" class="form-control">			
								<span class="input-group-addon">shipping cost</span>
							</div>
						
					</div>
				</div>
				
				<!-- Future Plan -->
				<div class="row">
					<div class="col-md-4">
						<h1><span class="glyphicon glyphicon-th-list"></span> Statistic</h1>
						
						<div class="dropdown fullwidth">
							<button class="btn btn-info dropdown-toggle fullwidth" type="button" id="dropdownMenu1" data-toggle="dropdown">
								Dropdown
								<span class="caret pull-right"></span>
							</button>
							<ul class="dropdown-menu fullwidth" role="menu" aria-labelledby="dropdownMenu1">
								<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
								<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
								<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
								<li role="presentation" class="divider"></li>
								<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
							</ul>
						</div>
					</div>
					
					<div class="col-md-8">
						<h1><span class="glyphicon glyphicon-wrench"></span> Modify</h1>
						<ul class="nav nav-pills" role="tablist" id="search-area">
							<li class="active"><a href="#home" role="tab" data-toggle="tab">Home</a></li>
							<li><a href="#profile" role="tab" data-toggle="tab">Profile</a></li>
							<li><a href="#messages" role="tab" data-toggle="tab">Messages</a></li>
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