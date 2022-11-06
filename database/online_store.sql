-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 06, 2022 at 05:09 PM
-- Server version: 5.7.24
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `client_surname` varchar(255) NOT NULL,
  `client_dob` date NOT NULL,
  `client_email` varchar(255) NOT NULL,
  `client_contact` char(10) NOT NULL,
  `client_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `client_name`, `client_surname`, `client_dob`, `client_email`, `client_contact`, `client_password`) VALUES
(2, 'Martin', 'Louw', '2022-03-02', 'martin@louw.com', '0321654987', '$2y$10$NEnTNF4ySG0F33wQfuRjIOtU5qTHIbF1LL.U47g8tOrG.LV9Uw0oS'),
(15, 'Jonty', 'Vermaak', '2022-08-11', 'jonty@vermaak.com', '0321654987', '$2y$10$N3AFuqmYCpZt/zBJQVy.Eu1pDTcQyf/DMxdXF.2oIzDjOSkqg4.oS'),
(16, 'John', 'Doe', '2022-09-20', 'john@doe.com', '0258529573', '$2y$10$pqykYAapQZev4VYLHBMdTe8aauZpLRXJ78VjO3hskJmoay2k37GEy'),
(33, 'awd', 'awd', '2022-11-10', 'awdawd@awd.com', '1231231233', '$2y$10$aNVflSwFXvI/7PlUh1I9S.nKksNEHeVUq.6XDF1kbrbCxNi9oWgfy'),
(34, 'awd', 'awd', '2022-11-08', 'awdawdawd@awd.com', '1231231231', '$2y$10$zMD721fYp4yYzum7l.OrwOLmKKXwFq2ffzh6KrvnqLHpmuyfVrUPi'),
(35, 'Wilna', 'Potgieter', '1984-06-12', 'wpotgieter@vodamail.com', '0840274612', '$2y$10$FnL5jmKH8ZooOlUofNYp6uYJw7jDPdEWyWMWLlQbDXQCzAb6ej33m');

-- --------------------------------------------------------

--
-- Table structure for table `client_cart`
--

CREATE TABLE `client_cart` (
  `client_cart_inventory_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `client_cart_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `client_cart`
--

INSERT INTO `client_cart` (`client_cart_inventory_id`, `client_id`, `product_id`, `client_cart_quantity`) VALUES
(15, 2, 22, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(10000) DEFAULT NULL,
  `product_price` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `product_brand_id` int(11) NOT NULL,
  `product_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_description`, `product_price`, `product_quantity`, `product_brand_id`, `product_category_id`) VALUES
(1, 'Kookaburra Pace Pro 7.0 Junior Cricket Bat', 'Made with a mid-high profile, the Pace is built specifically for those who favour a lighter bat and thinner handle.', 1800, 10, 1, 1),
(2, 'SS Supremo (Short Handle)', 'Selected Grade 3 English willow.  Specially designed Aqua Grip with Embossed Sunridges.  Huge Edges with Light Pick-up.', 3700, 2, 11, 1),
(3, 'Roboarm Cricket Ball Thrower', 'The roboarm advanced is the most advanced and world’s fastest ball throwing aid.  Revolutionary innovation in cricket skill development. Very easy to use and generate high speed deliveries with minimal effort Patented ball thrower.  In-box Contents: 1 stem with 1 Ball holder.', 800, 20, 13, 12),
(4, 'New Balance DC1280 Blue/Orange Batting Gloves (Mens Size)', 'The Players Choice DC 1280 new block split glove has been made with premium materials for added protection. You’ll have all the comfort you need in this one. Used by Australian batting great Steve Smith.', 2000, 9, 12, 3),
(5, 'Gray-Nicolls GN9 Excalibur Players Batting Gloves (Mens Size)', 'Used by International Player Kane Williamson', 2000, 4, 5, 3),
(6, 'ADIDAS PADS XT 2.0', NULL, 1400, 15, 3, 6),
(7, 'DP HYDRO I PADS SNR', NULL, 2300, 30, 8, 6),
(8, 'PUMA 19.1 BOWLING RED/YLW BLAST', NULL, 2700, 15, 7, 8),
(9, 'DSC GREEN BELTER RUBBERS', NULL, 600, 1, 14, 8),
(10, 'DSC CONDOR SURGE THIGH PAD COMBO', NULL, 700, 6, 14, 5),
(11, 'Gray-Nicolls ACADEMY THIGH PAD', NULL, 250, 30, 5, 5),
(12, 'Gray-Nicolls PRO MINI ARM GUARD', NULL, 400, 56, 5, 4),
(13, 'GM ORIGINAL WHEELIE DUFFLE (22)', NULL, 3500, 12, 2, 10),
(14, 'KB PRO 1.0 WHEELIE BAG BLK/BLUE (21)', NULL, 3300, 2, 1, 10),
(15, 'MASURI STEM GUARD', NULL, 1000, 21, 16, 2),
(16, 'GN ATOMIC COMP HELMET NAVY', NULL, 1500, 32, 5, 2),
(17, 'KOOKABURRA TURF BALL', NULL, 3000, 50, 1, 9),
(18, 'DP 4P BLADE UPP BALL', NULL, 600, 41, 8, 9),
(19, 'Wood Mallet', NULL, 150, 61, 17, 11),
(20, 'Fielding Disc Marker', NULL, 50, 120, 17, 11),
(21, 'Grip Cone', NULL, 100, 21, 9, 11),
(22, 'KOOKABURRA GHOST PRO 8.0 CRICKET BAT', 'As your perfect companion to training, the Ghost Pro 8.0 Senior bat is the latest Kashmir willow in the collection and features a mid profile and minimalist styling to suit all playing conditions.', 2000, 51, 1, 1),
(23, 'KOOKABURRA SHADOW PRO 2.0 CRICKET BAT', 'Produced with a mid-low profile, the Shadow is back with it’s distinct duckbill shape to enhance blade pickup and batting speed.', 7000, 5, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_brand`
--

CREATE TABLE `product_brand` (
  `product_brand_id` int(11) NOT NULL,
  `product_brand_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_brand`
--

INSERT INTO `product_brand` (`product_brand_id`, `product_brand_name`) VALUES
(1, 'Kookaburra'),
(2, 'Gunn & Moore'),
(3, 'Adidas'),
(4, 'Slazenger'),
(5, 'Gray-Nicolls'),
(6, 'Bellingham & Smith'),
(7, 'Puma'),
(8, 'D&P'),
(9, 'Boomboom'),
(10, 'Nike'),
(11, 'Sommers'),
(12, 'New Balance'),
(13, 'Roboarm'),
(14, 'DSC'),
(15, 'MRF'),
(16, 'Masuri'),
(17, 'BAS');

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `product_category_id` int(11) NOT NULL,
  `product_category_name` varchar(255) NOT NULL,
  `product_category_image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`product_category_id`, `product_category_name`, `product_category_image`) VALUES
(1, 'Bats', 'https://morkelsport.co.za/wp-content/uploads/2021/04/dsc-munro-15.jpg'),
(2, 'Batting Helmets', 'https://cdn.shopify.com/s/files/1/0276/1811/5618/products/67b0fdbaa1431dcb24f30d8e01cbc8a743a8ecf5_600x.png?v=1603116728'),
(3, 'Batting Gloves', 'https://www.tcscricket.com/wp-content/uploads/2021/08/KOOKABURRA-GHOST-900-BATTING-GLOVES-5-510x510.jpg'),
(4, 'Arm Pads', 'https://contents.mediadecathlon.com/p1654984/f3885c50fcb87e13cab5f5196549ec65/p1654984.jpg?format=auto&quality=70&f=1024x0'),
(5, 'Thigh Pads', 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/AERO-P1.jpg'),
(6, 'Batting Pads', 'https://cdn.shopify.com/s/files/1/0276/1811/5618/products/4c5a3554bc6fe380bd64aa0c17e3584a4034cc36_600x.png?v=1604931689'),
(7, 'Apparel', 'https://www.mrcrickethockey.com/wp-content/uploads/2019/03/animage-1.png'),
(8, 'Footwear', 'https://cdn.shopify.com/s/files/1/0274/3707/2468/products/0N_hmMI_1024x1024.png?v=1645014488'),
(9, 'Balls', 'https://staticc.sportskeeda.com/wp-content/uploads/2015/05/cricket-balls-1432109232-2369680.jpg'),
(10, 'Bags', 'https://cdn.shopify.com/s/files/1/0276/1811/5618/products/2b2d566e68017e67307e2c13cd1322b5ad19a868_500x.png?v=1602345668'),
(11, 'Accessories', 'https://www.sstoncricket.com/media/catalog/tmp/category/accessories_1_.png'),
(12, 'Other', 'http://btlmsports.co.za/wp-content/uploads/2018/07/kookaburra_spring_return_cricket_stumps-1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `product_image_id` int(11) NOT NULL,
  `product_image` varchar(10000) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`product_image_id`, `product_image`, `product_id`) VALUES
(1, 'https://cricketpro.co.za/wp-content/uploads/2022/01/roboarm_ball_thrower_-_white_cricketpro.jpg', 3),
(2, 'https://cricketpro.b-cdn.net/wp-content/uploads/2020/09/roboarm-info-510x765.jpg', 3),
(3, 'https://cricketpro.b-cdn.net/wp-content/uploads/2020/09/leverage_roboarm_ball_thrower_-_black_cricketpro.co_.za_-510x680.jpg', 3),
(4, 'https://cricketpro.b-cdn.net/wp-content/uploads/2020/09/THE_ROBO_ARM_MULTI_BALL_THROWER-600x800636456709155977734_grande.jpg', 3),
(5, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/190339_Main_Thumb_0367539.jpg', 6),
(6, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/XT-3.0-PADS-5.jpg', 6),
(7, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/XT-3.0-PADS-3.jpg', 6),
(8, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/Pads_HydroI_White.jpg', 7),
(9, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/Pads_HydroI_Set1_White.jpg', 7),
(10, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/Pads_HydroI_Set2_White.jpg', 7),
(11, 'https://cricketpro.co.za/wp-content/uploads/2021/12/Pace-Pro-7.0-Cricket-Bat-510x684.jpg', 1),
(12, 'https://cricketpro.b-cdn.net/wp-content/uploads/2021/03/ew_supreme_1_1-510x510.jpg', 2),
(13, 'https://cricketpro.co.za/wp-content/uploads/2020/12/new_balance_-_dc1280_blue_orange_cricket_batting_gloves_mens_size.jpg', 4),
(14, 'https://cricketpro.co.za/wp-content/uploads/2020/09/gray_nicolls_gn9_excalibur_cricket_batting_glove_men_size_cricketpro.jpg', 5),
(15, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/08/10551103-1.jpg', 8),
(16, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/09/belter-sea-green-white-cricket-shoes.jpg', 9),
(17, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/09/belter-sea-green-white-cricket-shoes-5.jpg', 9),
(18, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/09/condor-surge-thigh-pad-combo.jpg', 10),
(19, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/06/ACADEMY-1.jpg', 11),
(20, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/01/582505ArmguardMiniPro_1500x.jpg', 12),
(21, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/ORIG-DUFFLE.png', 13),
(22, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/223878_Gallery_2_0742893.jpg', 14),
(23, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/223878_Gallery_3_0742894.jpg', 14),
(24, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/223878_Main_Thumb_0742889.jpg', 14),
(25, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/Masuri-Stemguard-Lite-Junior-2017_142_2_0_0.jpg', 15),
(26, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/masuri_stemguard_club_junior_p4-1000x1000_2_2.jpg', 15),
(27, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/06/ATOMIC-HELMET.jpg', 16),
(28, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/09/1A1101M01-cricket-ball-turf-red-front.jpg', 17),
(29, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/09/Ball_UPP156g-500x500-1.jpg', 18),
(30, 'https://stadiumsport.co.za/wp-content/uploads/2022/02/Untitled-2.jpg', 19),
(31, 'https://stadiumsport.co.za/wp-content/uploads/2022/02/0922300002.jpg', 20),
(32, 'https://stadiumsport.co.za/wp-content/uploads/2022/02/BAS_GRIP_CONE.jpg', 21),
(33, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2B11191-GhostPro8.0Bat-Grouped_1024x1024@2x.png?v=1635927357', 22),
(34, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2B11191-GhostPro8.0Bat-Back_1024x1024@2x.png?v=1635927357', 22),
(35, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2B11191-GhostPro8.0Bat-Face_1024x1024@2x.png?v=1635927357', 22),
(36, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2B11191-GhostPro8.0Bat-Side_1024x1024@2x.png?v=1635927357', 22),
(37, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2A11273-ShadowPro2.0Bat-Grouped_1024x1024@2x.png?v=1631716033', 23),
(38, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2A11273-ShadowPro2.0Bat-Face_1024x1024@2x.png?v=1631716033', 23),
(39, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2A11273-ShadowPro2.0Bat-Back_1024x1024@2x.png?v=1631716033', 23),
(40, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2A11273-ShadowPro2.0Bat-Side_1024x1024@2x.png?v=1631716031', 23);

-- --------------------------------------------------------

--
-- Table structure for table `product_thumbnail`
--

CREATE TABLE `product_thumbnail` (
  `product_thumbnail_id` int(11) NOT NULL,
  `product_thumbnail_image` varchar(250) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_thumbnail`
--

INSERT INTO `product_thumbnail` (`product_thumbnail_id`, `product_thumbnail_image`, `product_id`) VALUES
(1, 'https://cricketpro.co.za/wp-content/uploads/2021/12/Pace-Pro-7.0-Cricket-Bat-510x684.jpg', 1),
(2, 'https://cricketpro.b-cdn.net/wp-content/uploads/2021/03/ew_supreme_1_1-510x510.jpg', 2),
(3, 'https://cricketpro.co.za/wp-content/uploads/2022/01/roboarm_ball_thrower_-_white_cricketpro.jpg', 3),
(4, 'https://cricketpro.co.za/wp-content/uploads/2020/12/new_balance_-_dc1280_blue_orange_cricket_batting_gloves_mens_size.jpg', 4),
(5, 'https://cricketpro.co.za/wp-content/uploads/2020/09/gray_nicolls_gn9_excalibur_cricket_batting_glove_men_size_cricketpro.jpg', 5),
(6, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/190339_Main_Thumb_0367539.jpg', 6),
(7, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/Pads_HydroI_White.jpg', 7),
(8, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/08/10551103-1.jpg', 8),
(9, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/09/belter-sea-green-white-cricket-shoes.jpg', 9),
(10, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/09/condor-surge-thigh-pad-combo.jpg', 10),
(11, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/06/ACADEMY-1.jpg', 11),
(12, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/01/582505ArmguardMiniPro_1500x.jpg', 12),
(13, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/ORIG-DUFFLE.png', 13),
(14, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/223878_Gallery_2_0742893.jpg', 14),
(15, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/06/Masuri-Stemguard-Lite-Junior-2017_142_2_0_0.jpg', 15),
(16, 'https://cricketcompanystore.co.za/wp-content/uploads/2022/06/ATOMIC-HELMET.jpg', 16),
(17, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/09/1A1101M01-cricket-ball-turf-red-front.jpg', 17),
(18, 'https://cricketcompanystore.co.za/wp-content/uploads/2021/09/Ball_UPP156g-500x500-1.jpg', 18),
(19, 'https://stadiumsport.co.za/wp-content/uploads/2022/02/Untitled-2.jpg', 19),
(20, 'https://stadiumsport.co.za/wp-content/uploads/2022/02/0922300002.jpg', 20),
(21, 'https://stadiumsport.co.za/wp-content/uploads/2022/02/BAS_GRIP_CONE.jpg', 21),
(22, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2B11191-GhostPro8.0Bat-Grouped_1024x1024@2x.png?v=1635927357', 22),
(23, 'https://cdn.shopify.com/s/files/1/0477/8459/1523/products/2A11273-ShadowPro2.0Bat-Grouped_1024x1024@2x.png?v=1631716033', 23);

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `query_id` int(11) NOT NULL,
  `query_email` varchar(255) NOT NULL,
  `query_desc` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `queries`
--

INSERT INTO `queries` (`query_id`, `query_email`, `query_desc`) VALUES
(1, 'awd@awd.com', 'awd \"awd\"'),
(2, 'awd@awd.com', 'awdawd'),
(3, 'awd@awd.com', 'awdawd'),
(4, 'awd@awd.com', 'awd \"awd or awd\" awd'),
(5, 'awd@awd.com', 'awd awd $# &quot;awd&quot;'),
(6, 'awd@awd.com', 'awd  awd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `client_email` (`client_email`);

--
-- Indexes for table `client_cart`
--
ALTER TABLE `client_cart`
  ADD PRIMARY KEY (`client_cart_inventory_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_brand_id` (`product_brand_id`),
  ADD KEY `product_category_id` (`product_category_id`);

--
-- Indexes for table `product_brand`
--
ALTER TABLE `product_brand`
  ADD PRIMARY KEY (`product_brand_id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`product_category_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`product_image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_thumbnail`
--
ALTER TABLE `product_thumbnail`
  ADD PRIMARY KEY (`product_thumbnail_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`query_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `client_cart`
--
ALTER TABLE `client_cart`
  MODIFY `client_cart_inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `product_brand`
--
ALTER TABLE `product_brand`
  MODIFY `product_brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `product_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `product_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `product_thumbnail`
--
ALTER TABLE `product_thumbnail`
  MODIFY `product_thumbnail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `query_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `client_cart`
--
ALTER TABLE `client_cart`
  ADD CONSTRAINT `client_cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `client_cart_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_brand_id`) REFERENCES `product_brand` (`product_brand_id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`product_category_id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `product_thumbnail`
--
ALTER TABLE `product_thumbnail`
  ADD CONSTRAINT `product_thumbnail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
