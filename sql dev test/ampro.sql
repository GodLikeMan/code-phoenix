SET NAMES UTF8;
CREATE DATABASE IF NOT EXISTS ampro CHARACTER SET utf8 COLLATE utf8_general_ci;
USE ampro;


/*
*	名稱		:	product
*	功能		:	產品基本資料
*
*	PRIMARY KEY  = sku
*
*	sku						:	商品代碼
*	name					:	商品全名
*	cost					:	進貨成本(新台幣)
*	date_created	:	輸入資料庫日期
*	date_modified	:	更改日期
*
*/
CREATE TABLE IF NOT EXISTS `product`
(
	`sku` VARCHAR(15),
	`name` VARCHAR(80),
	`cost` SMALLINT UNSIGNED DEFAULT 0,
	`date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (sku)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



/*
*	名稱					:	product_price_record
*	功能					:	產品價格相關修改紀錄
*
*	PRIMARY KEY  = id
*
*	sku						:	商品代碼
*	seller_id				:	賣家對應id
*	price					:	販賣價格
*	s_price				:	收取運費價格
*	date_created	:	輸入資料庫日期	
* 	date_modified	:	更改日期
*/
CREATE TABLE IF NOT EXISTS `product_price_record`
(
	`id` INT AUTO_INCREMENT,
	`sku` VARCHAR(15) NOT NULL,
	`seller_id` TINYINT UNSIGNED NOT NULL,	
	`price` DECIMAL(6,2) NOT NULL DEFAULT 0,
	`s_price`	DECIMAL(5,2) NOT NULL DEFAULT 0,
	`currency` CHAR(3) NOT NULL DEFAULT 'USD',
	`date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
	
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
*	date_created	:	創造日期
*	date_modified	:	更改日期
*
*/
CREATE TABLE IF NOT EXISTS `shipping_record` 
(
	`id` INT AUTO_INCREMENT,
	`pv_id` INT UNSIGNED DEFAULT 0,
	`sku` VARCHAR(15) NOT NULL,
	`country_code` CHAR(3) NOT NULL,
	`s_cost` SMALLINT UNSIGNED NOT NULL DEFAULT 0 ,
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
*  sku        		:	產品代碼
*	p_type		:	包裝類型
*	p_length	:	包裝長度，單位公分，整數
*	p_width		:	包裝寬度，單位公分，整數
*	p_height	:	包裝高度，單位公分，整數
*	p_weight	:	包裝重量，單位公斤，小數前兩位+小數後兩位
*/
CREATE TABLE IF NOT EXISTS `package_volume` 
(
	`id` INT AUTO_INCREMENT,
	`sku` VARCHAR(15),
	`p_type` TINYINT NOT NULL,
	`p_length` TINYINT UNSIGNED NOT NULL,
	`p_width` TINYINT UNSIGNED NOT NULL,
	`p_height` TINYINT UNSIGNED NOT NULL,
	`p_weight` DECIMAL(4,2) DEFAULT 0,
	PRIMARY KEY (`id`)
	
)ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/*
*	名稱			:	seller
*	功能			:	賣家帳號相關
*
*	PRIMARY KEY  = id
*
*	id						:	不重複流水號
*	name					:	賣家代稱
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
*	name				:	國家全名
*	iso_numeric	:	國家iso數字代碼
*/
CREATE TABLE IF NOT EXISTS `country_list` (
	`iso_numeric` CHAR(3) NOT NULL,
	`name` VARCHAR(45) NOT NULL,
	PRIMARY KEY (`iso_numeric`)
	
) ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ;


/*
*	名稱		:	tag
*	功能		:	
*	
*	PRIMARY KEY  = id
*
*	name			:	tag名稱
*	category	:	tag分類
*/
CREATE TABLE IF NOT EXISTS `tag` (
	`id` INT AUTO_INCREMENT,
	`name` VARCHAR(30) NOT NULL,
	`category` VARCHAR(30) NOT NULL DEFAULT 'None',
	PRIMARY KEY (`id`)
	
) ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ;


/*
*	名稱		:	tag_product_map
*	功能		:	對應sku和tag
*
*	PRIMARY KEY  = id	
*
*	t_id			:	tag的id
*	sku			:	產品代碼
*/
CREATE TABLE IF NOT EXISTS `tag_product_map` (
	`id` INT AUTO_INCREMENT,
	`t_id` INT UNSIGNED NOT NULL,
	`sku` VARCHAR(15) NOT NULL,
	UNIQUE KEY (`t_id`,`sku`),
	PRIMARY KEY (`id`)
	
) ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ;

/*
*	名稱		:	tag_sr_map
*	功能		:	對應shipping record和tag
*
*	PRIMARY KEY  = id	
*
*	t_id			:	tag的id
*	sr_id		:	shipping record的ID
*/
CREATE TABLE IF NOT EXISTS `tag_sr_map` (
	`id` INT AUTO_INCREMENT,
	`t_id`  INT UNSIGNED  NOT NULL,
	`sr_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`id`)
	
) ENGINE InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ;


