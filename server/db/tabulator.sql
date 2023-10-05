-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2023 at 08:37 AM
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
(1, 1, 'Retzie Mae M. Quilab', 21, 'ABC - Association of Barangay Captains'),
(2, 2, 'Ira Claire A. Mangao', 20, 'SBU - Siao Bian Un'),
(3, 3, 'Heizel Jane A. Curambao', 19, 'SCC - Southern Capital Colleges'),
(4, 4, 'Gracelle Marie T. Flores', 25, 'OCEMCO - Oroquieta City Employees Multi-purpose Cooperative'),
(5, 5, 'Ruffa Mae J. Bacoy', 24, 'PMVA & MOFBA - Public Market Vendors Association/Mis. Occ. Boat Assoc.'),
(6, 6, 'Azie May C. Andrade', 25, 'USTP - University of Science and Technology of Southern Philippines'),
(7, 7, 'Leonila A. Jonson', 23, 'SK - Sangguniang Kabataan'),
(8, 8, 'Kiesha Jel C. Bacatan', 22, 'OCWD - Oroquieta City Water District'),
(9, 9, 'Graciela I. Satur', 25, 'DEPED - Department of Education'),
(10, 10, 'Kyla Mae G. Recha', 24, 'OAIS - Oroquieta Agro Industrial School'),
(11, 11, 'Lei Ann Ria A. Villarico', 25, 'OCIGEA - Oroquieta City Government Employess Association');

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
(2, 'PRODUCTION NUMBER & PRODUCTION ATTIRE', 'productionNumberImage', '/production_number', 1),
(4, 'BEST IN SWIM WEAR', 'swimWearImage', '/swim_wear', 1),
(5, 'BEST IN EVENING GOWN', 'eveninggowimage', '/evening_gown', 1),
(6, 'TOP FIVE', 'topFiveImage', '/top_five', 1),
(7, 'FINAL ROUND', 'finalRoundImage', '/final_round', 1);

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
(2, 1, 0, 29.5, 7.00, 'unlocked'),
(3, 2, 0, 31.5, 8.00, 'unlocked'),
(4, 3, 0, 23.0, 1.50, 'unlocked'),
(5, 4, 0, 23.0, 1.50, 'unlocked'),
(6, 5, 0, 28.5, 6.00, 'unlocked'),
(7, 6, 0, 32.0, 9.00, 'unlocked'),
(8, 7, 0, 44.0, 11.00, 'unlocked'),
(9, 8, 0, 41.0, 10.00, 'unlocked'),
(10, 9, 0, 27.5, 5.00, 'unlocked'),
(11, 10, 0, 23.5, 3.00, 'unlocked'),
(12, 11, 0, 26.5, 4.00, 'unlocked'),
(14, 1, 2, 8.0, 6.50, 'locked'),
(15, 1, 7, 6.7, 10.00, 'locked'),
(16, 2, 2, 9.0, 2.50, 'locked'),
(17, 3, 2, 10.0, 1.00, 'locked'),
(19, 2, 7, 6.5, 11.00, 'locked'),
(20, 4, 2, 6.0, 9.00, 'locked'),
(21, 3, 7, 7.8, 8.00, 'locked'),
(22, 5, 2, 5.0, 10.50, 'locked'),
(23, 6, 2, 5.0, 10.50, 'locked'),
(24, 7, 2, 7.0, 8.00, 'locked'),
(25, 8, 2, 8.0, 6.50, 'locked'),
(26, 4, 7, 8.0, 5.50, 'locked'),
(27, 9, 2, 9.0, 2.50, 'locked'),
(28, 5, 7, 9.8, 1.00, 'locked'),
(29, 6, 7, 8.8, 3.00, 'locked'),
(31, 7, 7, 7.7, 9.00, 'locked'),
(32, 8, 7, 8.0, 5.50, 'locked'),
(33, 9, 7, 8.0, 5.50, 'locked'),
(34, 10, 7, 9.0, 2.00, 'locked'),
(35, 11, 2, 8.5, 5.00, 'locked'),
(36, 11, 7, 8.0, 5.50, 'locked'),
(37, 10, 2, 8.7, 4.00, 'locked'),
(38, 1, 6, 6.0, 10.50, 'locked'),
(39, 2, 6, 7.6, 5.00, 'locked'),
(40, 3, 6, 7.0, 6.50, 'locked'),
(41, 4, 6, 8.7, 1.00, 'locked'),
(42, 5, 6, 7.0, 6.50, 'locked'),
(43, 6, 6, 6.7, 8.50, 'locked'),
(44, 7, 6, 6.0, 10.50, 'locked'),
(45, 8, 6, 6.7, 8.50, 'locked'),
(46, 9, 6, 8.0, 3.00, 'locked'),
(47, 10, 6, 8.0, 3.00, 'locked'),
(48, 11, 6, 8.0, 3.00, 'locked'),
(50, 2, 5, 8.0, 5.50, 'locked'),
(51, 3, 5, 9.0, 3.50, 'locked'),
(52, 4, 5, 9.0, 3.50, 'locked'),
(53, 5, 5, 10.0, 1.50, 'locked'),
(54, 6, 5, 7.0, 8.00, 'locked'),
(55, 7, 5, 6.0, 9.00, 'locked'),
(56, 8, 5, 5.0, 10.50, 'locked'),
(57, 9, 5, 8.0, 5.50, 'locked'),
(58, 10, 5, 5.0, 10.50, 'locked'),
(59, 11, 5, 7.5, 7.00, 'locked'),
(60, 1, 5, 10.0, 1.50, 'locked'),
(61, 1, 4, 10.0, 1.00, 'locked'),
(62, 2, 4, 7.0, 7.50, 'locked'),
(63, 3, 4, 8.0, 4.00, 'locked'),
(64, 4, 4, 8.0, 4.00, 'locked'),
(65, 5, 4, 6.0, 9.00, 'locked'),
(66, 6, 4, 9.0, 2.00, 'locked'),
(67, 7, 4, 7.0, 7.50, 'locked'),
(68, 8, 4, 5.0, 10.00, 'locked'),
(69, 9, 4, 4.0, 11.00, 'locked'),
(70, 10, 4, 8.0, 4.00, 'locked'),
(72, 11, 4, 7.9, 6.00, 'locked');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `final_round`
--
ALTER TABLE `final_round`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `production_attire`
--
ALTER TABLE `production_attire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `production_number`
--
ALTER TABLE `production_number`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `swim_wear`
--
ALTER TABLE `swim_wear`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `talent_presentation`
--
ALTER TABLE `talent_presentation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `top_five`
--
ALTER TABLE `top_five`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
