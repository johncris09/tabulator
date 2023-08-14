-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 14, 2023 at 08:28 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tabulator`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `sponsor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `number`, `name`, `age`, `sponsor`) VALUES
(1, 1, 'Emily White', 21, 'QRS Enterprises'),
(2, 2, 'Lisa Taylor', 20, 'UVW Group'),
(3, 3, 'Jessica Chen', 19, 'MNO Ventures'),
(4, 4, 'Ashley Kim', 25, 'GHI Investments'),
(5, 5, 'Sarah Johnson', 24, 'ZZZ Corp.'),
(6, 6, 'Emma Lee', 25, 'ABC Inc.'),
(7, 7, 'Olivia Miller', 23, 'LMN Solutions'),
(8, 8, 'Sophia Wilson', 22, 'PQR Corp.'),
(9, 9, 'Ava Wong', 25, 'STU Holdings'),
(10, 10, 'Mia Brown', 24, 'DEF Corporation'),
(11, 11, 'Isabella Smith', 25, 'XYZ Corporation'),
(12, 12, 'Harper Doe', 23, 'Acme Industries');

-- --------------------------------------------------------

--
-- Table structure for table `evening_gown`
--

CREATE TABLE `evening_gown` (
  `id` int(11) NOT NULL,
  `candidate` int(11) NOT NULL,
  `judge` int(11) NOT NULL,
  `score` double(10,1) DEFAULT NULL,
  `rank` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unlocked'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `evening_gown`
--

INSERT INTO `evening_gown` (`id`, `candidate`, `judge`, `score`, `rank`, `status`) VALUES
(3, 1, 4, 10.0, 1.00, 'locked'),
(4, 1, 0, 36.5, 8.00, 'unlocked'),
(5, 2, 0, 41.5, 10.00, 'unlocked'),
(6, 3, 0, 44.0, 12.00, 'unlocked'),
(7, 4, 0, 42.5, 11.00, 'unlocked'),
(8, 5, 0, 30.0, 5.00, 'unlocked'),
(9, 6, 0, 26.5, 4.00, 'unlocked'),
(10, 7, 0, 40.5, 9.00, 'unlocked'),
(11, 8, 0, 31.0, 6.00, 'unlocked'),
(12, 9, 0, 22.5, 2.50, 'unlocked'),
(13, 10, 0, 19.5, 1.00, 'unlocked'),
(14, 11, 0, 33.0, 7.00, 'unlocked'),
(15, 12, 0, 22.5, 2.50, 'unlocked'),
(16, 2, 4, 5.0, 8.50, 'locked'),
(17, 3, 4, 3.0, 11.00, 'locked'),
(18, 4, 4, 5.0, 8.50, 'locked'),
(19, 1, 2, 4.0, 3.50, 'locked'),
(20, 2, 2, 5.0, 1.00, 'locked'),
(21, 3, 2, 3.0, 8.00, 'locked'),
(22, 4, 2, 2.0, 11.50, 'locked'),
(23, 5, 2, 3.0, 8.00, 'locked'),
(24, 6, 2, 3.0, 8.00, 'locked'),
(25, 7, 2, 4.0, 3.50, 'locked'),
(26, 8, 2, 2.0, 11.50, 'locked'),
(27, 9, 2, 3.0, 8.00, 'locked'),
(28, 10, 2, 4.0, 3.50, 'locked'),
(29, 11, 2, 3.0, 8.00, 'locked'),
(30, 12, 2, 4.0, 3.50, 'locked'),
(31, 5, 4, 3.0, 11.00, 'locked'),
(32, 7, 4, 3.0, 11.00, 'locked'),
(33, 6, 4, 6.0, 7.00, 'locked'),
(34, 8, 4, 7.0, 5.50, 'locked'),
(35, 9, 4, 8.0, 3.50, 'locked'),
(36, 10, 4, 9.0, 2.00, 'locked'),
(37, 11, 4, 8.0, 3.50, 'locked'),
(38, 12, 4, 7.0, 5.50, 'locked'),
(39, 1, 5, 5.0, 10.50, 'locked'),
(40, 2, 5, 4.0, 12.00, 'locked'),
(41, 3, 5, 6.0, 8.00, 'locked'),
(42, 4, 5, 7.0, 4.50, 'locked'),
(43, 5, 5, 8.0, 1.50, 'locked'),
(44, 6, 5, 7.0, 4.50, 'locked'),
(45, 7, 5, 6.0, 8.00, 'locked'),
(46, 8, 5, 7.0, 4.50, 'locked'),
(47, 9, 5, 8.0, 1.50, 'locked'),
(48, 10, 5, 7.0, 4.50, 'locked'),
(49, 11, 5, 6.0, 8.00, 'locked'),
(50, 12, 5, 5.0, 10.50, 'locked'),
(51, 1, 6, 5.0, 11.50, 'locked'),
(52, 2, 6, 6.0, 8.00, 'locked'),
(53, 3, 6, 5.0, 11.50, 'locked'),
(54, 4, 6, 6.0, 8.00, 'locked'),
(55, 5, 6, 7.0, 4.00, 'locked'),
(56, 6, 6, 8.0, 1.50, 'locked'),
(57, 7, 6, 6.0, 8.00, 'locked'),
(58, 8, 6, 7.0, 4.00, 'locked'),
(59, 9, 6, 6.0, 8.00, 'locked'),
(60, 10, 6, 7.0, 4.00, 'locked'),
(61, 11, 6, 6.0, 8.00, 'locked'),
(62, 12, 6, 8.0, 1.50, 'locked'),
(63, 1, 7, 4.0, 10.00, 'locked'),
(64, 2, 7, 3.0, 12.00, 'locked'),
(65, 3, 7, 6.0, 5.50, 'locked'),
(66, 4, 7, 4.0, 10.00, 'locked'),
(67, 5, 7, 6.0, 5.50, 'locked'),
(68, 6, 7, 6.0, 5.50, 'locked'),
(69, 7, 7, 4.0, 10.00, 'locked'),
(70, 8, 7, 6.0, 5.50, 'locked'),
(71, 9, 7, 7.0, 1.50, 'locked'),
(72, 10, 7, 6.0, 5.50, 'locked'),
(73, 11, 7, 6.0, 5.50, 'locked'),
(74, 12, 7, 7.0, 1.50, 'locked');

-- --------------------------------------------------------

--
-- Table structure for table `final_round`
--

CREATE TABLE `final_round` (
  `id` int(11) NOT NULL,
  `candidate` int(11) NOT NULL,
  `judge` int(11) NOT NULL,
  `score` double(10,1) DEFAULT NULL,
  `rank` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unlocked'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `final_round`
--

INSERT INTO `final_round` (`id`, `candidate`, `judge`, `score`, `rank`, `status`) VALUES
(1, 10, 2, 1.0, 5.00, 'locked'),
(2, 12, 2, 3.0, 2.00, 'locked'),
(3, 11, 2, 3.0, 2.00, 'locked'),
(4, 6, 2, 2.0, 4.00, 'locked'),
(5, 7, 2, 3.0, 2.00, 'locked'),
(6, 10, 4, 4.0, 1.00, 'locked'),
(7, 12, 4, 3.0, 3.00, 'locked'),
(8, 11, 4, 2.0, 5.00, 'locked'),
(9, 6, 4, 3.0, 3.00, 'locked'),
(10, 7, 4, 3.0, 3.00, 'locked'),
(11, 10, 5, 3.0, 1.00, 'locked'),
(12, 12, 5, 1.0, 4.00, 'locked'),
(13, 11, 5, 1.0, 4.00, 'locked'),
(14, 6, 5, 1.0, 4.00, 'locked'),
(15, 7, 5, 2.0, 2.00, 'locked'),
(16, 10, 6, 2.0, 3.00, 'locked'),
(17, 12, 6, 2.0, 3.00, 'locked'),
(18, 11, 6, 3.0, 1.00, 'locked'),
(19, 6, 6, 1.0, 5.00, 'locked'),
(20, 7, 6, 2.0, 3.00, 'locked'),
(21, 10, 7, 4.0, 2.50, 'locked'),
(22, 12, 7, 2.0, 4.50, 'locked'),
(23, 11, 7, 4.0, 2.50, 'locked'),
(24, 6, 7, 5.0, 1.00, 'locked'),
(25, 7, 7, 2.0, 4.50, 'locked'),
(26, 6, 0, 17.0, 5.00, 'unlocked'),
(27, 7, 0, 14.5, 2.50, 'unlocked'),
(28, 10, 0, 12.5, 1.00, 'unlocked'),
(29, 11, 0, 14.5, 2.50, 'unlocked'),
(30, 12, 0, 16.5, 4.00, 'unlocked');

-- --------------------------------------------------------

--
-- Table structure for table `production_attire`
--

CREATE TABLE `production_attire` (
  `id` int(11) NOT NULL,
  `candidate` int(11) NOT NULL,
  `judge` int(11) NOT NULL,
  `score` double(10,1) DEFAULT NULL,
  `rank` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unlocked'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `production_attire`
--

INSERT INTO `production_attire` (`id`, `candidate`, `judge`, `score`, `rank`, `status`) VALUES
(1, 1, 2, 5.0, 7.50, 'locked'),
(2, 2, 5, 2.0, 11.50, 'locked'),
(3, 1, 0, 41.0, 10.00, 'unlocked'),
(4, 2, 0, 52.5, 12.00, 'unlocked'),
(5, 3, 0, 33.0, 8.00, 'unlocked'),
(6, 4, 0, 49.5, 11.00, 'unlocked'),
(7, 5, 0, 39.0, 9.00, 'unlocked'),
(8, 6, 0, 28.0, 5.00, 'unlocked'),
(9, 7, 0, 31.0, 7.00, 'unlocked'),
(10, 8, 0, 30.0, 6.00, 'unlocked'),
(11, 9, 0, 17.0, 1.00, 'unlocked'),
(12, 10, 0, 20.5, 2.00, 'unlocked'),
(13, 11, 0, 24.5, 4.00, 'unlocked'),
(14, 12, 0, 24.0, 3.00, 'unlocked'),
(15, 2, 2, 2.0, 12.00, 'locked'),
(16, 3, 2, 5.0, 7.50, 'locked'),
(17, 5, 2, 5.0, 7.50, 'locked'),
(18, 4, 2, 4.0, 10.50, 'locked'),
(19, 6, 2, 5.0, 7.50, 'locked'),
(20, 7, 2, 6.0, 3.50, 'locked'),
(21, 8, 2, 4.0, 10.50, 'locked'),
(22, 9, 2, 6.0, 3.50, 'locked'),
(23, 10, 2, 7.0, 1.00, 'locked'),
(24, 11, 2, 6.0, 3.50, 'locked'),
(25, 12, 2, 6.0, 3.50, 'locked'),
(26, 1, 4, 5.0, 3.50, 'locked'),
(27, 2, 4, 2.0, 10.00, 'locked'),
(28, 3, 4, 5.0, 3.50, 'locked'),
(29, 4, 4, 2.0, 10.00, 'locked'),
(30, 5, 4, 1.0, 12.00, 'locked'),
(31, 6, 4, 5.0, 3.50, 'locked'),
(32, 7, 4, 2.0, 10.00, 'locked'),
(33, 1, 7, 3.0, 12.00, 'locked'),
(34, 2, 7, 4.0, 10.50, 'locked'),
(35, 3, 7, 5.0, 7.00, 'locked'),
(36, 4, 7, 4.0, 10.50, 'locked'),
(37, 5, 7, 5.0, 7.00, 'locked'),
(38, 6, 7, 6.0, 2.50, 'locked'),
(39, 7, 7, 5.0, 7.00, 'locked'),
(40, 8, 7, 6.0, 2.50, 'locked'),
(41, 9, 7, 5.0, 7.00, 'locked'),
(42, 10, 7, 6.0, 2.50, 'locked'),
(43, 11, 7, 5.0, 7.00, 'locked'),
(44, 12, 7, 6.0, 2.50, 'locked'),
(45, 8, 4, 4.0, 7.50, 'locked'),
(46, 9, 4, 5.0, 3.50, 'locked'),
(47, 10, 4, 4.0, 7.50, 'locked'),
(48, 11, 4, 5.0, 3.50, 'locked'),
(49, 12, 4, 5.0, 3.50, 'locked'),
(50, 1, 5, 5.0, 6.00, 'locked'),
(51, 3, 5, 2.0, 11.50, 'locked'),
(52, 4, 5, 3.0, 10.00, 'locked'),
(53, 5, 5, 4.0, 9.00, 'locked'),
(54, 6, 5, 5.0, 6.00, 'locked'),
(55, 7, 5, 6.0, 2.00, 'locked'),
(56, 8, 5, 5.0, 6.00, 'locked'),
(57, 9, 5, 6.0, 2.00, 'locked'),
(58, 10, 5, 5.0, 6.00, 'locked'),
(59, 11, 5, 6.0, 2.00, 'locked'),
(60, 12, 5, 5.0, 6.00, 'locked'),
(61, 1, 6, 4.0, 12.00, 'locked'),
(62, 2, 6, 5.0, 8.50, 'locked'),
(63, 3, 6, 6.0, 3.50, 'locked'),
(64, 4, 6, 5.0, 8.50, 'locked'),
(65, 5, 6, 6.0, 3.50, 'locked'),
(66, 6, 6, 5.0, 8.50, 'locked'),
(67, 7, 6, 5.0, 8.50, 'locked'),
(68, 8, 6, 6.0, 3.50, 'locked'),
(69, 9, 6, 7.0, 1.00, 'locked'),
(70, 10, 6, 6.0, 3.50, 'locked'),
(71, 12, 6, 5.0, 8.50, 'locked'),
(72, 11, 6, 5.0, 8.50, 'locked');

-- --------------------------------------------------------

--
-- Table structure for table `production_number`
--

CREATE TABLE `production_number` (
  `id` int(11) NOT NULL,
  `candidate` int(11) NOT NULL,
  `judge` int(11) NOT NULL,
  `score` double(10,1) DEFAULT NULL,
  `rank` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unlocked'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `production_number`
--

INSERT INTO `production_number` (`id`, `candidate`, `judge`, `score`, `rank`, `status`) VALUES
(1, 1, 2, 10.0, 1.00, 'locked'),
(2, 2, 4, 2.0, 11.50, 'locked'),
(3, 1, 0, 36.0, 8.00, 'unlocked'),
(4, 2, 0, 48.0, 12.00, 'unlocked'),
(5, 3, 0, 46.0, 10.50, 'unlocked'),
(6, 4, 0, 46.0, 10.50, 'unlocked'),
(7, 5, 0, 42.0, 9.00, 'unlocked'),
(8, 6, 0, 28.0, 4.50, 'unlocked'),
(9, 7, 0, 28.0, 4.50, 'unlocked'),
(10, 8, 0, 30.5, 6.50, 'unlocked'),
(11, 9, 0, 30.5, 6.50, 'unlocked'),
(12, 10, 0, 18.5, 2.00, 'unlocked'),
(13, 11, 0, 21.0, 3.00, 'unlocked'),
(14, 12, 0, 15.5, 1.00, 'unlocked'),
(15, 2, 2, 6.0, 3.50, 'locked'),
(16, 3, 2, 2.0, 10.50, 'locked'),
(17, 4, 2, 1.0, 12.00, 'locked'),
(18, 5, 2, 2.0, 10.50, 'locked'),
(19, 6, 2, 5.0, 6.50, 'locked'),
(20, 7, 2, 6.0, 3.50, 'locked'),
(21, 8, 2, 4.0, 8.50, 'locked'),
(22, 9, 2, 4.0, 8.50, 'locked'),
(23, 10, 2, 6.0, 3.50, 'locked'),
(24, 11, 2, 5.0, 6.50, 'locked'),
(25, 12, 2, 6.0, 3.50, 'locked'),
(26, 1, 4, 10.0, 1.00, 'locked'),
(27, 3, 4, 2.0, 11.50, 'locked'),
(28, 4, 4, 6.0, 5.50, 'locked'),
(29, 5, 4, 5.0, 8.00, 'locked'),
(30, 6, 4, 5.0, 8.00, 'locked'),
(31, 7, 4, 6.0, 5.50, 'locked'),
(32, 8, 4, 5.0, 8.00, 'locked'),
(33, 9, 4, 4.0, 10.00, 'locked'),
(34, 10, 4, 7.0, 3.50, 'locked'),
(35, 11, 4, 7.0, 3.50, 'locked'),
(36, 12, 4, 8.0, 2.00, 'locked'),
(37, 1, 5, 1.0, 12.00, 'locked'),
(38, 2, 5, 2.0, 11.00, 'locked'),
(39, 3, 5, 6.0, 6.00, 'locked'),
(40, 4, 5, 5.0, 9.50, 'locked'),
(41, 5, 5, 5.0, 9.50, 'locked'),
(42, 6, 5, 6.0, 6.00, 'locked'),
(43, 7, 5, 7.0, 2.00, 'locked'),
(44, 8, 5, 6.0, 6.00, 'locked'),
(45, 9, 5, 7.0, 2.00, 'locked'),
(46, 10, 5, 6.0, 6.00, 'locked'),
(47, 11, 5, 7.0, 2.00, 'locked'),
(48, 12, 5, 6.0, 6.00, 'locked'),
(49, 1, 6, 3.0, 12.00, 'locked'),
(50, 2, 6, 4.0, 10.00, 'locked'),
(51, 3, 6, 5.0, 7.00, 'locked'),
(52, 4, 6, 4.0, 10.00, 'locked'),
(53, 5, 6, 5.0, 7.00, 'locked'),
(54, 6, 6, 6.0, 4.50, 'locked'),
(55, 7, 6, 4.0, 10.00, 'locked'),
(56, 8, 6, 5.0, 7.00, 'locked'),
(57, 9, 6, 7.0, 3.00, 'locked'),
(58, 10, 6, 9.1, 1.00, 'locked'),
(59, 11, 6, 6.0, 4.50, 'locked'),
(60, 12, 6, 7.6, 2.00, 'locked'),
(61, 1, 7, 4.0, 10.00, 'locked'),
(62, 2, 7, 2.0, 12.00, 'locked'),
(63, 3, 7, 3.0, 11.00, 'locked'),
(64, 4, 7, 5.0, 9.00, 'locked'),
(65, 5, 7, 6.0, 7.00, 'locked'),
(66, 6, 7, 7.7, 3.00, 'locked'),
(67, 7, 7, 6.0, 7.00, 'locked'),
(68, 8, 7, 8.8, 1.00, 'locked'),
(69, 9, 7, 6.0, 7.00, 'locked'),
(70, 10, 7, 7.0, 4.50, 'locked'),
(71, 11, 7, 7.0, 4.50, 'locked'),
(72, 12, 7, 8.0, 2.00, 'locked');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `hide` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `title`, `image`, `link`, `hide`) VALUES
(1, 'TALENT PRESENTATION', 'talentPresentationImage', '/talent_presentation', 0),
(2, 'PRODUCTION NUMBER & PRODUCTION ATTIRE', 'productionNumberImage', '/production_number', 0),
(4, 'BEST IN SWIM WEAR', 'swimWearImage', '/swim_wear', 0),
(5, 'BEST IN EVENING GOWN', 'eveninggowimage', '/evening_gown', 0),
(6, 'TOP FIVE', 'topFiveImage', '/top_five', 0),
(7, 'FINAL ROUND', 'finalRoundImage', '/final_round', 0);

-- --------------------------------------------------------

--
-- Table structure for table `swim_wear`
--

CREATE TABLE `swim_wear` (
  `id` int(11) NOT NULL,
  `candidate` int(11) NOT NULL,
  `judge` int(11) NOT NULL,
  `score` double(10,1) DEFAULT NULL,
  `rank` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unlocked'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `swim_wear`
--

INSERT INTO `swim_wear` (`id`, `candidate`, `judge`, `score`, `rank`, `status`) VALUES
(1, 1, 2, 4.0, 7.50, 'locked'),
(2, 1, 0, 54.5, 12.00, 'unlocked'),
(3, 2, 0, 41.5, 9.50, 'unlocked'),
(4, 3, 0, 46.0, 11.00, 'unlocked'),
(5, 4, 0, 29.5, 5.00, 'unlocked'),
(6, 5, 0, 32.0, 6.00, 'unlocked'),
(7, 6, 0, 34.0, 7.00, 'unlocked'),
(8, 7, 0, 23.0, 3.00, 'unlocked'),
(9, 8, 0, 41.5, 9.50, 'unlocked'),
(10, 9, 0, 23.5, 4.00, 'unlocked'),
(11, 10, 0, 10.0, 1.00, 'unlocked'),
(12, 11, 0, 20.0, 2.00, 'unlocked'),
(13, 12, 0, 34.5, 8.00, 'unlocked'),
(14, 2, 2, 2.0, 10.50, 'locked'),
(15, 3, 2, 1.0, 12.00, 'locked'),
(16, 4, 2, 5.0, 4.50, 'locked'),
(17, 5, 2, 6.0, 1.50, 'locked'),
(18, 6, 2, 4.0, 7.50, 'locked'),
(19, 7, 2, 5.0, 4.50, 'locked'),
(20, 8, 2, 2.0, 10.50, 'locked'),
(21, 9, 2, 5.0, 4.50, 'locked'),
(22, 10, 2, 6.0, 1.50, 'locked'),
(23, 11, 2, 5.0, 4.50, 'locked'),
(24, 12, 2, 3.0, 9.00, 'locked'),
(25, 1, 4, 2.0, 11.00, 'locked'),
(26, 2, 4, 4.0, 5.50, 'locked'),
(27, 3, 4, 1.0, 12.00, 'locked'),
(28, 4, 4, 3.0, 8.50, 'locked'),
(29, 5, 4, 3.0, 8.50, 'locked'),
(30, 1, 7, 1.0, 12.00, 'locked'),
(31, 2, 7, 2.0, 10.50, 'locked'),
(32, 3, 7, 4.0, 5.50, 'locked'),
(33, 4, 7, 5.0, 1.50, 'locked'),
(34, 5, 7, 4.0, 5.50, 'locked'),
(35, 6, 7, 5.0, 1.50, 'locked'),
(36, 7, 7, 4.0, 5.50, 'locked'),
(37, 8, 7, 2.0, 10.50, 'locked'),
(38, 9, 7, 3.0, 9.00, 'locked'),
(39, 10, 7, 4.0, 5.50, 'locked'),
(40, 11, 7, 4.0, 5.50, 'locked'),
(41, 12, 7, 4.0, 5.50, 'locked'),
(42, 6, 4, 3.0, 8.50, 'locked'),
(43, 7, 4, 4.0, 5.50, 'locked'),
(44, 8, 4, 5.0, 4.00, 'locked'),
(45, 9, 4, 6.0, 2.50, 'locked'),
(46, 10, 4, 7.0, 1.00, 'locked'),
(47, 11, 4, 6.0, 2.50, 'locked'),
(48, 12, 4, 3.0, 8.50, 'locked'),
(49, 1, 5, 2.0, 12.00, 'locked'),
(50, 2, 5, 5.0, 4.50, 'locked'),
(51, 3, 5, 4.0, 9.50, 'locked'),
(52, 4, 5, 5.0, 4.50, 'locked'),
(53, 5, 5, 4.0, 9.50, 'locked'),
(54, 6, 5, 4.0, 9.50, 'locked'),
(55, 7, 5, 5.0, 4.50, 'locked'),
(56, 8, 5, 4.0, 9.50, 'locked'),
(57, 9, 5, 5.0, 4.50, 'locked'),
(58, 10, 5, 6.0, 1.00, 'locked'),
(59, 11, 5, 5.0, 4.50, 'locked'),
(60, 12, 5, 5.0, 4.50, 'locked'),
(61, 1, 6, 2.0, 12.00, 'locked'),
(62, 2, 6, 3.0, 10.50, 'locked'),
(63, 3, 6, 4.0, 7.00, 'locked'),
(64, 4, 6, 3.0, 10.50, 'locked'),
(65, 5, 6, 4.0, 7.00, 'locked'),
(66, 6, 6, 4.0, 7.00, 'locked'),
(67, 7, 6, 5.0, 3.00, 'locked'),
(68, 8, 6, 4.0, 7.00, 'locked'),
(69, 9, 6, 5.0, 3.00, 'locked'),
(70, 10, 6, 6.0, 1.00, 'locked'),
(71, 11, 6, 5.0, 3.00, 'locked'),
(72, 12, 6, 4.0, 7.00, 'locked');

-- --------------------------------------------------------

--
-- Table structure for table `talent_presentation`
--

CREATE TABLE `talent_presentation` (
  `id` int(11) NOT NULL,
  `candidate` int(11) NOT NULL,
  `judge` int(11) NOT NULL,
  `score` double(10,1) DEFAULT NULL,
  `rank` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unlocked'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `talent_presentation`
--

INSERT INTO `talent_presentation` (`id`, `candidate`, `judge`, `score`, `rank`, `status`) VALUES
(1, 1, 2, 2.0, 11.50, 'locked'),
(2, 1, 0, 46.5, 11.00, 'locked'),
(3, 2, 0, 53.5, 12.00, 'locked'),
(4, 3, 0, 44.5, 9.00, 'locked'),
(5, 4, 0, 23.0, 3.00, 'locked'),
(6, 5, 0, 34.0, 8.00, 'locked'),
(7, 6, 0, 12.0, 1.00, 'locked'),
(8, 7, 0, 46.0, 10.00, 'locked'),
(9, 8, 0, 29.0, 6.00, 'locked'),
(10, 9, 0, 27.5, 4.00, 'locked'),
(11, 10, 0, 31.5, 7.00, 'locked'),
(12, 11, 0, 28.0, 5.00, 'locked'),
(13, 12, 0, 14.5, 2.00, 'locked'),
(14, 2, 2, 4.0, 8.50, 'locked'),
(15, 3, 2, 2.0, 11.50, 'locked'),
(16, 4, 2, 5.0, 6.50, 'locked'),
(17, 5, 2, 6.0, 4.50, 'locked'),
(18, 6, 2, 7.0, 2.50, 'locked'),
(19, 7, 2, 3.0, 10.00, 'locked'),
(20, 8, 2, 4.0, 8.50, 'locked'),
(21, 9, 2, 5.0, 6.50, 'locked'),
(22, 10, 2, 6.0, 4.50, 'locked'),
(23, 11, 2, 7.0, 2.50, 'locked'),
(24, 12, 2, 8.0, 1.00, 'locked'),
(25, 1, 4, 1.0, 12.00, 'locked'),
(26, 2, 4, 4.0, 11.00, 'locked'),
(27, 3, 4, 5.0, 8.00, 'locked'),
(28, 4, 4, 6.0, 3.50, 'locked'),
(29, 5, 4, 5.0, 8.00, 'locked'),
(30, 6, 4, 6.6, 1.00, 'locked'),
(31, 7, 4, 5.0, 8.00, 'locked'),
(32, 8, 4, 6.0, 3.50, 'locked'),
(33, 9, 4, 5.0, 8.00, 'locked'),
(34, 10, 4, 6.0, 3.50, 'locked'),
(35, 11, 4, 5.0, 8.00, 'locked'),
(36, 12, 4, 6.0, 3.50, 'locked'),
(37, 1, 5, 6.0, 4.00, 'locked'),
(38, 2, 5, 3.0, 12.00, 'locked'),
(39, 3, 5, 5.0, 8.00, 'locked'),
(40, 4, 5, 6.0, 4.00, 'locked'),
(41, 5, 5, 5.0, 8.00, 'locked'),
(42, 6, 5, 6.0, 4.00, 'locked'),
(43, 7, 5, 4.0, 10.50, 'locked'),
(44, 8, 5, 5.0, 8.00, 'locked'),
(45, 9, 5, 6.0, 4.00, 'locked'),
(46, 10, 5, 4.0, 10.50, 'locked'),
(47, 11, 5, 6.0, 4.00, 'locked'),
(48, 12, 5, 7.0, 1.00, 'locked'),
(49, 1, 6, 3.0, 12.00, 'locked'),
(50, 2, 6, 4.0, 11.00, 'locked'),
(51, 3, 6, 5.0, 10.00, 'locked'),
(52, 4, 6, 6.0, 6.50, 'locked'),
(53, 5, 6, 6.0, 6.50, 'locked'),
(54, 6, 6, 7.0, 2.00, 'locked'),
(55, 7, 6, 6.0, 6.50, 'locked'),
(56, 8, 6, 7.0, 2.00, 'locked'),
(57, 9, 6, 6.0, 6.50, 'locked'),
(58, 10, 6, 7.0, 2.00, 'locked'),
(59, 11, 6, 6.0, 6.50, 'locked'),
(60, 12, 6, 6.0, 6.50, 'locked'),
(61, 1, 7, 6.0, 7.00, 'locked'),
(62, 2, 7, 5.0, 11.00, 'locked'),
(63, 3, 7, 6.0, 7.00, 'locked'),
(64, 4, 7, 7.0, 2.50, 'locked'),
(65, 5, 7, 6.0, 7.00, 'locked'),
(66, 6, 7, 7.0, 2.50, 'locked'),
(67, 7, 7, 5.0, 11.00, 'locked'),
(68, 8, 7, 6.0, 7.00, 'locked'),
(69, 9, 7, 7.0, 2.50, 'locked'),
(70, 10, 7, 5.0, 11.00, 'locked'),
(71, 11, 7, 6.0, 7.00, 'locked'),
(72, 12, 7, 7.0, 2.50, 'locked');

-- --------------------------------------------------------

--
-- Table structure for table `top_five`
--

CREATE TABLE `top_five` (
  `id` int(11) NOT NULL,
  `candidate` int(11) NOT NULL,
  `judge` int(11) NOT NULL,
  `score` double(10,1) DEFAULT NULL,
  `rank` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unlocked'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `top_five`
--

INSERT INTO `top_five` (`id`, `candidate`, `judge`, `score`, `rank`, `status`) VALUES
(1, 1, 2, 3.0, 12.00, 'locked'),
(2, 1, 0, 56.0, 12.00, 'unlocked'),
(3, 2, 0, 45.0, 11.00, 'unlocked'),
(4, 3, 0, 44.0, 10.00, 'unlocked'),
(5, 4, 0, 41.0, 9.00, 'unlocked'),
(6, 5, 0, 33.5, 7.00, 'unlocked'),
(7, 6, 0, 23.0, 4.00, 'unlocked'),
(8, 7, 0, 27.0, 5.00, 'unlocked'),
(9, 8, 0, 27.5, 6.00, 'unlocked'),
(10, 9, 0, 35.5, 8.00, 'unlocked'),
(11, 10, 0, 17.5, 1.00, 'unlocked'),
(12, 11, 0, 22.0, 3.00, 'unlocked'),
(13, 12, 0, 18.0, 2.00, 'unlocked'),
(14, 2, 2, 4.0, 11.00, 'locked'),
(15, 3, 2, 5.0, 10.00, 'locked'),
(16, 4, 2, 6.0, 8.00, 'locked'),
(17, 5, 2, 7.0, 5.00, 'locked'),
(18, 6, 2, 8.0, 2.50, 'locked'),
(19, 7, 2, 6.0, 8.00, 'locked'),
(20, 8, 2, 7.0, 5.00, 'locked'),
(21, 9, 2, 6.0, 8.00, 'locked'),
(22, 10, 2, 7.0, 5.00, 'locked'),
(23, 11, 2, 8.0, 2.50, 'locked'),
(24, 12, 2, 9.0, 1.00, 'locked'),
(25, 1, 4, 5.0, 10.00, 'locked'),
(26, 2, 4, 6.0, 6.00, 'locked'),
(27, 3, 4, 7.0, 2.00, 'locked'),
(28, 4, 4, 4.0, 12.00, 'locked'),
(29, 5, 4, 5.0, 10.00, 'locked'),
(30, 6, 4, 6.0, 6.00, 'locked'),
(31, 7, 4, 7.0, 2.00, 'locked'),
(32, 8, 4, 6.0, 6.00, 'locked'),
(33, 9, 4, 5.0, 10.00, 'locked'),
(34, 10, 4, 6.0, 6.00, 'locked'),
(35, 11, 4, 7.0, 2.00, 'locked'),
(36, 12, 4, 6.0, 6.00, 'locked'),
(37, 1, 5, 5.0, 11.00, 'locked'),
(38, 2, 5, 5.0, 11.00, 'locked'),
(39, 3, 5, 5.0, 11.00, 'locked'),
(40, 4, 5, 6.0, 7.50, 'locked'),
(41, 5, 5, 7.0, 3.50, 'locked'),
(42, 6, 5, 8.0, 1.00, 'locked'),
(43, 7, 5, 7.0, 3.50, 'locked'),
(44, 8, 5, 6.0, 7.50, 'locked'),
(45, 9, 5, 6.0, 7.50, 'locked'),
(46, 10, 5, 7.0, 3.50, 'locked'),
(47, 11, 5, 6.0, 7.50, 'locked'),
(48, 12, 5, 7.0, 3.50, 'locked'),
(49, 1, 6, 3.0, 12.00, 'locked'),
(50, 2, 6, 4.0, 11.00, 'locked'),
(51, 3, 6, 5.0, 10.00, 'locked'),
(52, 4, 6, 6.0, 7.50, 'locked'),
(53, 5, 6, 7.0, 4.00, 'locked'),
(54, 6, 6, 6.0, 7.50, 'locked'),
(55, 7, 6, 6.0, 7.50, 'locked'),
(56, 8, 6, 6.0, 7.50, 'locked'),
(57, 9, 6, 7.0, 4.00, 'locked'),
(58, 10, 6, 8.0, 1.50, 'locked'),
(59, 11, 6, 7.0, 4.00, 'locked'),
(60, 12, 6, 8.0, 1.50, 'locked'),
(61, 1, 7, 5.0, 11.00, 'locked'),
(62, 2, 7, 6.0, 6.00, 'locked'),
(63, 3, 7, 5.0, 11.00, 'locked'),
(64, 4, 7, 6.0, 6.00, 'locked'),
(65, 5, 7, 5.0, 11.00, 'locked'),
(66, 6, 7, 6.0, 6.00, 'locked'),
(67, 7, 7, 6.0, 6.00, 'locked'),
(68, 8, 7, 7.0, 1.50, 'locked'),
(69, 9, 7, 6.0, 6.00, 'locked'),
(70, 10, 7, 7.0, 1.50, 'locked'),
(71, 11, 7, 6.0, 6.00, 'locked'),
(72, 12, 7, 6.0, 6.00, 'locked');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `short_name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_type` varchar(100) NOT NULL,
  `judge_no` varchar(11) DEFAULT NULL,
  `is_logged_in` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `short_name`, `username`, `password`, `role_type`, `judge_no`, `is_logged_in`) VALUES
(1, 'Adminitrator', '', 'admin', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'admin', NULL, 1),
(2, 'Ronald David', 'R. David', 'judge1', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'judge', 'judge1', 1),
(4, 'Marie Eliane Unchuan', 'M. Unchuan', 'judge2', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'judge', 'judge2', 1),
(5, 'Rouslia A. Oaminal', 'R. Oaminal', 'judge3', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'judge', 'judge3', 1),
(6, 'Maura M. Salatandre', 'M. Salatandre', 'judge4', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'judge', 'judge4', 1),
(7, 'Alexandra Faith Garcia', 'A. Garcia', 'judge5', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'judge', 'judge5', 1),
(8, 'admin2', '', 'admin2', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'admin', NULL, 0),
(9, 'richly', 'richly', 'richly1', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'admin', NULL, 0),
(10, 'nckie', '', 'nckie19', '$2a$12$E09Kl9hTT93dPEJhdrjtzeFxEcfgqtRIngGmwbSFXAlNwtZz/OaZ2', 'admin', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `evening_gown`
--
ALTER TABLE `evening_gown`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `final_round`
--
ALTER TABLE `final_round`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `production_attire`
--
ALTER TABLE `production_attire`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `production_number`
--
ALTER TABLE `production_number`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `swim_wear`
--
ALTER TABLE `swim_wear`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `talent_presentation`
--
ALTER TABLE `talent_presentation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `top_five`
--
ALTER TABLE `top_five`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `evening_gown`
--
ALTER TABLE `evening_gown`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `final_round`
--
ALTER TABLE `final_round`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `production_attire`
--
ALTER TABLE `production_attire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `production_number`
--
ALTER TABLE `production_number`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `swim_wear`
--
ALTER TABLE `swim_wear`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `talent_presentation`
--
ALTER TABLE `talent_presentation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `top_five`
--
ALTER TABLE `top_five`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
