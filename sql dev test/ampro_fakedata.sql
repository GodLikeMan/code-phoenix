SET NAMES UTF8;
USE ampro;
/*
*	Fake date input
*	for test only
*/

INSERT INTO product(sku,cost)
VALUES
('test1',5566),('test2',56),('grax',2000),('graw',2200),('fle2',4000),('flf6',4300),('xcac',400),('xcz2',3300),('sjb6',1800),('sjm2',1600),('sjo5',3500),('sjq1',4000),('sjs4',3300)
,('sjs7',2500),('sjs9',4500),('flc2',4500),('flf1',5000),('flf3',6000),('flf7',5500),('flf9',6500),('flh3',13000),('graa',1200),('grs9',1200),('gru1',2900),('gru6',1400),('gru7',1400),('gru8',1600),('grx2',1300),('grx3',1500),('grx4',1500)
,('grx9',2000),('gry1',2300),('pes3',525);


INSERT INTO seller(name,sell_platform)
VALUES
('test_account','amazon'),
('3amotor.com','ebay'),
('qwq ebay','ebay');

INSERT INTO product_price_record(sku,seller_id,price,s_price)
VALUES
('test1',1,778.8,30.16),('test1',2,86.86,25),('test2',1,666,40.55),('grax',2,94.99,24),('graw',2,99.99,24),('grax',1,94.99,24),('graw',1,99.99,24),('fle2',1,210,90),('flf6',1,369.95,0),('xcac',1,29.49,0),
('xcz2',1,169.99,60),('sjb6',1,250,20),('sjm2',1,147,14),('sjo5',1,326.66,0),('sjq1',1,373,0),('sjs4',1,277.6,0),('sjs7',1,226,17),('flc2',1,299.99,0),('flf1',1,249.99,150),('flf3',1,299.99,195),('flf7',1,299.99,135),
('flf9',1,349.99,125),('flh3',1,588,150),('sjs9',1,259.99,90),('graa',1,64.99,30),('grs9',1,64.99,30),('gru1',1,139.99,30),('gru6',1,72.99,30),('gru7',1,72.99,30),('gru8',1,79.99,30),('grx2',1,69.99,30),('grx3',1,75.99,30),
('grx4',1,75.99,30),('grx9',1,97.99,30),('gry1',1,109.99,30),('pes3',1,78.99,0);


INSERT INTO package_volume(sku,p_type,p_length,p_width,p_height,p_weight)
VALUES
('test1',1,180,55,8,9.56),
('test1',2,155,55,5,5.56);

/*shipping_provider*/
INSERT INTO tag(name,category) 
VALUES
('EMS','shipping provider'),
('Fedex','shipping provider'),
('DHL','shipping provider');

/*package_type*/
INSERT INTO tag(name,category) 
VALUES
('木箱','common package type'),
('紙箱','common package type'),
('EMS Package','package type'),
('Fedex Envlope','package type');

/*Product tags*/
INSERT INTO tag(name,category) 
VALUES
('黑色','product'),
('車型','product'),
('好用$_$','product'),
('媽我在這!@#$%^&*()_+=~`','product');

INSERT INTO tag_product_map(t_id,sku)
VALUES
(8,'test1'),
(9,'test1'),
(10,'test1'),
(11,'test1'),
(8,'test2'),
(8,'test3'),
(8,'test4'),
(8,'test5'),
(8,'test6');

INSERT INTO shipping_record(sku,country_code,s_cost)
VALUES
('test1',158,3939),
('test1',158,5555),
('test1',840,4444);

INSERT INTO tag_sr_map(t_id,sr_id)
VALUES
(1,1),
(4,1),
(2,2),
(7,2),
(4,3),
(3,3);

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