CREATE DATABASE IF NOT EXISTS ampro CHARACTER SET utf8 COLLATE utf8_general_ci;
USE ampro;


/*
*	名稱		:	product
*	功能		:	產品基本資料
*
*	PRIMARY KEY  = id
*
*	sku			:	商品代碼
*	name		:	商品全名
*	cost		:	進貨成本(新台幣)
*
*/
CREATE TABLE IF NOT EXISTS `product`
(
	`sku` VARCHAR(8),
	`name` VARCHAR(45),
	`cost` SMALLINT UNSIGNED,
	PRIMARY KEY (sku)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/*
*	名稱		:	product_sellinfo
*	功能		:	不同賣家對應的商品資訊
*
*	PRIMARY KEY  = sku,seller_id
*
*	sku			:	商品代碼
*	seller_id	:	賣家對應id
*	price		:	販賣價格
*	s_price	:	收取運費價格
*	currency	:	價格幣別
* 	
*/
CREATE TABLE IF NOT EXISTS `product_sellinfo`
(
	`sku` VARCHAR(8),
	`seller_id` TINYINT UNSIGNED,
	`price` DECIMAL(6,2) NOT NULL DEFAULT 0,
	`s_price`	DECIMAL(5,2) NOT NULL DEFAULT 0,
	`currency` CHAR(3) NOT NULL DEFAULT 'USD',
	PRIMARY KEY (`sku`,`seller_id`)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/*
*	名稱		:	shipping_record
*	功能		:	記錄商品運費
*
*	PRIMARY KEY  = id
*	pv_id					:	商品體積對應id
*	sku						:	商品代碼
*	country_code	:	寄送國家(數字代碼)
*	s_cost					:	貨運費用(新台幣)
*	s_provider			:	貨運商
*
*/
CREATE TABLE IF NOT EXISTS `shipping_record` 
(
	`id` INT AUTO_INCREMENT,
	`pv_id` INT UNSIGNED DEFAULT 0,
	`sku` VARCHAR(8) NOT NULL,
	`country_code` CHAR(3) NOT NULL,
	`s_cost` SMALLINT UNSIGNED DEFAULT 0,
	`s_provider` TINYINT NOT NULL,
	`date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/*
*	名稱		:	package_volume 
*	功能		:	記錄產品包裝種類和體積重量
*
*	PRIMARY KEY  = id
*
*   sku         :	產品代碼
*	p_type	:	包裝類型
*	p_length	:	包裝長度，單位公分，整數
*	p_width	:	包裝寬度，單位公分，整數
*	p_height	:	包裝高度，單位公分，整數
*	p_weight:	包裝重量，單位公斤，小數前兩位+小數後兩位
*/
CREATE TABLE IF NOT EXISTS `package_volume` 
(
	`id` INT AUTO_INCREMENT,
	`sku` VARCHAR(8),
	`p_type` TINYINT NOT NULL,
	`p_length` TINYINT UNSIGNED NOT NULL,
	`p_width` TINYINT UNSIGNED NOT NULL,
	`p_height` TINYINT UNSIGNED NOT NULL,
	`p_weight` DECIMAL(4,2) DEFAULT 0,
	PRIMARY KEY (`id`)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



/*
*	名稱			:	shipping_provider
*	功能			:	貨運商清單
*
*	PRIMARY KEY  = id
*
*	id				:	不重複流水號
*	name		:	名稱
*/
CREATE TABLE IF NOT EXISTS `shipping_provider` 
(
	`id` TINYINT AUTO_INCREMENT,
	`name` VARCHAR(15) NOT NULL,
	PRIMARY KEY (`id`)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;




/*
*	名稱			:	package_type
*	功能			:	包裝種類
*
*	PRIMARY KEY  = id
*
*	id				:	不重複流水號
*	name		:	包裝名稱
*/
CREATE TABLE IF NOT EXISTS `package_type` 
(
	`id` TINYINT AUTO_INCREMENT,
	`name` VARCHAR(15) NOT NULL,
	`sp_id` TINYINT DEFAULT 0,
	PRIMARY KEY (`id`)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/*
*	名稱			:	seller
*	功能			:	賣家帳號相關
*
*	PRIMARY KEY  = id
*
*	id				:	不重複流水號
*	name			:	賣家代稱
*	sell_platform	:	賣場平台名稱
*/
CREATE TABLE IF NOT EXISTS `seller` 
(
	`id` TINYINT AUTO_INCREMENT,
	`name` VARCHAR(15) NOT NULL,
	`sell_platform` VARCHAR(10) NOT NULL,
	PRIMARY KEY (`id`)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/*
*	名稱		:	countries_list
*	功能		:	國家對照表
*	
*	name		:	國家全名
*	iso_numeric	:	國家iso數字代碼
*/
CREATE TABLE IF NOT EXISTS `country_list` (
	`iso_numeric` CHAR(3) NOT NULL,
	`name` VARCHAR(45) NOT NULL,
	PRIMARY KEY (`iso_numeric`)
	
) ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ;

INSERT INTO `country_list` (`name`, `iso_numeric`) VALUES
('Andorra', '020'),
('United Arab Emirates', '784'),
('Afghanistan', '004'),
('Antigua and Barbuda', '028'),
('Anguilla', '660'),
('Albania', '008'),
('Armenia', '051'),
('Angola', '024'),
('Antarctica', '010'),
('Argentina', '032'),
('American Samoa', '016'),
('Austria', '040'),
('Australia', '036'),
('Aruba', '533'),
('Åland', '248'),
('Azerbaijan', '031'),
('Bosnia and Herzegovina', '070'),
('Barbados', '052'),
('Bangladesh', '050'),
('Belgium', '056'),
('Burkina Faso', '854'),
('Bulgaria', '100'),
('Bahrain', '048'),
('Burundi', '108'),
('Benin', '204'),
('Saint Barthélemy', '652'),
('Bermuda', '060'),
('Brunei', '096'),
('Bolivia', '068'),
('Bonaire', '535'),
('Brazil', '076'),
('Bahamas', '044'),
('Bhutan', '064'),
('Bouvet Island', '074'),
('Botswana', '072'),
('Belarus', '112'),
('Belize', '084'),
('Canada', '124'),
('Cocos [Keeling] Islands', '166'),
('Democratic Republic of the Congo', '180'),
('Central African Republic', '140'),
('Republic of the Congo', '178'),
('Switzerland', '756'),
('Ivory Coast', '384'),
('Cook Islands', '184'),
('Chile', '152'),
('Cameroon', '120'),
('China', '156'),
('Colombia', '170'),
('Costa Rica', '188'),
('Cuba', '192'),
('Cape Verde', '132'),
('Curacao', '531'),
('Christmas Island', '162'),
('Cyprus', '196'),
('Czechia', '203'),
('Germany', '276'),
('Djibouti', '262'),
('Denmark', '208'),
('Dominica', '212'),
('Dominican Republic', '214'),
('Algeria', '012'),
('Ecuador', '218'),
('Estonia', '233'),
('Egypt', '818'),
('Western Sahara', '732'),
('Eritrea', '232'),
('Spain', '724'),
('Ethiopia', '231'),
('Finland', '246'),
('Fiji', '242'),
('Falkland Islands', '238'),
('Micronesia', '583'),
('Faroe Islands', '234'),
('France', '250'),
('Gabon', '266'),
('United Kingdom', '826'),
('Grenada', '308'),
('Georgia', '268'),
('French Guiana', '254'),
('Guernsey', '831'),
('Ghana', '288'),
('Gibraltar', '292'),
('Greenland', '304'),
('Gambia', '270'),
('Guinea', '324'),
('Guadeloupe', '312'),
('Equatorial Guinea', '226'),
('Greece', '300'),
('South Georgia and the South Sandwich Islands', '239'),
('Guatemala', '320'),
('Guam', '316'),
('Guinea-Bissau', '624'),
('Guyana', '328'),
('Hong Kong', '344'),
('Heard Island and McDonald Islands', '334'),
('Honduras', '340'),
('Croatia', '191'),
('Haiti', '332'),
('Hungary', '348'),
('Indonesia', '360'),
('Ireland', '372'),
('Israel', '376'),
('Isle of Man', '833'),
('India', '356'),
('British Indian Ocean Territory', '086'),
('Iraq', '368'),
('Iran', '364'),
('Iceland', '352'),
('Italy', '380'),
('Jersey', '832'),
('Jamaica', '388'),
('Jordan', '400'),
('Japan', '392'),
('Kenya', '404'),
('Kyrgyzstan', '417'),
('Cambodia', '116'),
('Kiribati', '296'),
('Comoros', '174'),
('Saint Kitts and Nevis', '659'),
('North Korea', '408'),
('South Korea', '410'),
('Kuwait', '414'),
('Cayman Islands', '136'),
('Kazakhstan', '398'),
('Laos', '418'),
('Lebanon', '422'),
('Saint Lucia', '662'),
('Liechtenstein', '438'),
('Sri Lanka', '144'),
('Liberia', '430'),
('Lesotho', '426'),
('Lithuania', '440'),
('Luxembourg', '442'),
('Latvia', '428'),
('Libya', '434'),
('Morocco', '504'),
('Monaco', '492'),
('Moldova', '498'),
('Montenegro', '499'),
('Saint Martin', '663'),
('Madagascar', '450'),
('Marshall Islands', '584'),
('Macedonia', '807'),
('Mali', '466'),
('Myanmar [Burma]', '104'),
('Mongolia', '496'),
('Macao', '446'),
('Northern Mariana Islands', '580'),
('Martinique', '474'),
('Mauritania', '478'),
('Montserrat', '500'),
('Malta', '470'),
('Mauritius', '480'),
('Maldives', '462'),
('Malawi', '454'),
('Mexico', '484'),
('Malaysia', '458'),
('Mozambique', '508'),
('Namibia', '516'),
('New Caledonia', '540'),
('Niger', '562'),
('Norfolk Island', '574'),
('Nigeria', '566'),
('Nicaragua', '558'),
('Netherlands', '528'),
('Norway', '578'),
('Nepal', '524'),
('Nauru', '520'),
('Niue', '570'),
('New Zealand', '554'),
('Oman', '512'),
('Panama', '591'),
('Peru', '604'),
('French Polynesia', '258'),
('Papua New Guinea', '598'),
('Philippines', '608'),
('Pakistan', '586'),
('Poland', '616'),
('Saint Pierre and Miquelon', '666'),
('Pitcairn Islands', '612'),
('Puerto Rico', '630'),
('Palestine', '275'),
('Portugal', '620'),
('Palau', '585'),
('Paraguay', '600'),
('Qatar', '634'),
('Réunion', '638'),
('Romania', '642'),
('Serbia', '688'),
('Russia', '643'),
('Rwanda', '646'),
('Saudi Arabia', '682'),
('Solomon Islands', '090'),
('Seychelles', '690'),
('Sudan', '729'),
('Sweden', '752'),
('Singapore', '702'),
('Saint Helena', '654'),
('Slovenia', '705'),
('Svalbard and Jan Mayen', '744'),
('Slovakia', '703'),
('Sierra Leone', '694'),
('San Marino', '674'),
('Senegal', '686'),
('Somalia', '706'),
('Suriname', '740'),
('South Sudan', '728'),
('São Tomé and Príncipe', '678'),
('El Salvador', '222'),
('Sint Maarten', '534'),
('Syria', '760'),
('Swaziland', '748'),
('Turks and Caicos Islands', '796'),
('Chad', '148'),
('French Southern Territories', '260'),
('Togo', '768'),
('Thailand', '764'),
('Tajikistan', '762'),
('Tokelau', '772'),
('East Timor', '626'),
('Turkmenistan', '795'),
('Tunisia', '788'),
('Tonga', '776'),
('Turkey', '792'),
('Trinidad and Tobago', '780'),
('Tuvalu', '798'),
('Taiwan', '158'),
('Tanzania', '834'),
('Ukraine', '804'),
('Uganda', '800'),
('U.S. Minor Outlying Islands', '581'),
('United States', '840'),
('Uruguay', '858'),
('Uzbekistan', '860'),
('Vatican City', '336'),
('Saint Vincent and the Grenadines', '670'),
('Venezuela', '862'),
('British Virgin Islands', '092'),
('U.S. Virgin Islands', '850'),
('Vietnam', '704'),
('Vanuatu', '548'),
('Wallis and Futuna', '876'),
('Samoa', '882'),
('Kosovo', '0'),
('Yemen', '887'),
('Mayotte', '175'),
('South Africa', '710'),
('Zambia', '894'),
('Zimbabwe', '716')