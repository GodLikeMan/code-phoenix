/*
*	Fake date input
*	for test only
*/

use ampro;

INSERT INTO product(sku,cost)
VALUES
('test1',5566),('test2',56);


INSERT INTO seller(name,sell_platform)
VALUES
('sokie tech','amazon'),
('test_account','ebay');

INSERT INTO product_sellinfo(sku,seller_id,price,s_price)
VALUES
('test1',1,778.8,30.16),
('test1',2,86.86,25),
('test2',1,666,40.55);

INSERT INTO package_volume(sku,p_type,p_length,p_width,p_height,p_weight)
VALUES
('test1',1,180,55,8,9.56),
('test1',2,155,55,5,5.56);

INSERT INTO shipping_provider(name)
VALUES
('EMS'),
('Fedex'),
('DHL');

INSERT INTO package_type(name,sp_id)
VALUES
('木箱',0),
('紙箱',0),
('Fedex Envlope',2);

INSERT INTO shipping_record(sku,country_code,s_cost,s_provider)
VALUES
('test1',158,3939,1),
('test1',158,5555,3),
('test1',840,4444,2);