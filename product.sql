-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2020 at 07:56 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_picture` varchar(100) NOT NULL,
  `product_created_at` datetime NOT NULL,
  `product_updated_at` datetime NOT NULL,
  `product_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_price`, `product_picture`, `product_created_at`, `product_updated_at`, `product_status`) VALUES
(1, 1, 'Black Forest', 30000, 'gambar/12.jpg', '2020-08-12 05:27:52', '2020-08-12 05:27:52', 1),
(2, 2, 'Cappucino', 5000, 'gambar/9.jpg', '2020-08-12 05:29:23', '2020-08-12 05:29:23', 1),
(3, 1, 'Chicken Katsu Dabu-dabu', 60000, 'gambar/13.jpg', '2020-08-12 05:30:19', '2020-08-12 05:30:19', 1),
(4, 1, 'Choco Rhum', 28000, 'gambar/11.jpg', '2020-08-12 05:31:40', '2020-08-12 05:31:40', 1),
(5, 2, 'Cofee Latte', 15000, 'gambar/8.jpg', '2020-08-12 05:33:12', '2020-08-12 05:33:12', 1),
(6, 2, 'Espresso', 10000, 'gambar/7.jpg', '2020-08-12 05:34:07', '2020-08-12 05:34:07', 1),
(7, 1, 'Red Velvet Latte', 33000, 'gambar/10.jpg', '2020-08-12 05:34:55', '2020-08-12 05:34:55', 1),
(8, 1, 'Salmon Truffle Teriyaki', 60000, 'gambar/14.jpg', '2020-08-12 05:35:43', '2020-08-12 05:35:43', 1),
(9, 1, 'Wiener Schnitzel', 69000, 'gambar/15.jpg', '2020-08-12 05:36:42', '2020-08-12 05:36:42', 1),
(28, 2, 'Coca-cola', 8000, 'gambar/90', '2020-08-18 12:22:23', '0000-00-00 00:00:00', 1),
(29, 2, 'Coca-cola', 8000, 'gambar/90', '2020-08-21 15:31:38', '0000-00-00 00:00:00', 1),
(30, 1, 'Smoke Beef', 3500, 'smoke beef pics', '2020-08-21 15:47:49', '2020-08-26 09:11:06', 1),
(31, 1, 'Pizza', 90000, 'Pizza picture', '2020-08-21 16:02:40', '2020-08-24 21:17:19', 1),
(32, 1, 'nasi padang', 20000, 'product/6', '2020-08-21 16:12:24', '2020-08-23 14:49:09', 1),
(34, 1, 'bakso', 90000, 'gambar/200', '2020-08-22 09:19:52', '2020-08-23 08:17:32', 1),
(35, 1, 'nasi goreng', 20000, 'gambar/95', '2020-08-23 08:04:00', '0000-00-00 00:00:00', 1),
(36, 1, 'sobet', 90000, 'gambar4', '2020-08-23 14:48:19', '0000-00-00 00:00:00', 1),
(37, 1, 'makaroni', 3000, 'picture 95', '2020-08-24 05:54:58', '0000-00-00 00:00:00', 1),
(38, 1, 'sate padang', 20000, 'pictures sate', '2020-08-24 07:18:31', '0000-00-00 00:00:00', 1),
(39, 1, 'Makaroni Skotel', 20000, 'picture 200', '2020-08-25 09:14:41', '0000-00-00 00:00:00', 1),
(40, 1, 'Bakwan', 2000, 'bakwan pic', '2020-08-26 09:05:19', '0000-00-00 00:00:00', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
