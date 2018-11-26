-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 26.11.2018 klo 19:56
-- Palvelimen versio: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laiterekisteri`
--

-- --------------------------------------------------------

--
-- Rakenne taululle `kayttaja`
--

DROP TABLE IF EXISTS `kayttaja`;
CREATE TABLE IF NOT EXISTS `kayttaja` (
  `kayttaja_id` int(11) NOT NULL AUTO_INCREMENT,
  `kayttajanimi` varchar(45) NOT NULL,
  `salasana` varchar(45) NOT NULL,
  `tyyppi` int(1) NOT NULL,
  `tyyppi_selite` varchar(45) DEFAULT NULL,
  `luontipvm` date DEFAULT NULL,
  `etunimi` varchar(45) DEFAULT NULL,
  `sukunimi` varchar(45) DEFAULT NULL,
  `puhnro` varchar(45) DEFAULT NULL,
  `osoite` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`kayttaja_id`),
  UNIQUE KEY `login_id_UNIQUE` (`kayttaja_id`),
  UNIQUE KEY `username_UNIQUE` (`kayttajanimi`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Vedos taulusta `kayttaja`
--

INSERT INTO `kayttaja` (`kayttaja_id`, `kayttajanimi`, `salasana`, `tyyppi`, `tyyppi_selite`, `luontipvm`, `etunimi`, `sukunimi`, `puhnro`, `osoite`) VALUES
(1, 'admin@admin.com', 'admin', 1, 'Admin', '2018-11-13', 'Admin', 'Admin', '1213456789', 'admin.com'),
(2, 'lassivillemulari@gmail.com', 'asd', 2, 'Customer', '2018-11-14', 'Hessu', 'Hopo', NULL, NULL);

-- --------------------------------------------------------

--
-- Rakenne taululle `laite`
--

DROP TABLE IF EXISTS `laite`;
CREATE TABLE IF NOT EXISTS `laite` (
  `sarjanumero` varchar(45) NOT NULL,
  `laite_id` int(10) NOT NULL,
  `laite_nimi` varchar(45) NOT NULL,
  `laite_merkki` varchar(45) NOT NULL,
  `laite_malli` varchar(45) NOT NULL,
  `omistaja` varchar(45) NOT NULL,
  `sijainti` varchar(45) DEFAULT NULL,
  `kuvaus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sarjanumero`),
  UNIQUE KEY `sarjanumero_UNIQUE` (`sarjanumero`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vedos taulusta `laite`
--

INSERT INTO `laite` (`sarjanumero`, `laite_id`, `laite_nimi`, `laite_merkki`, `laite_malli`, `omistaja`, `sijainti`, `kuvaus`) VALUES
('asd', 1, 'asdas', 'dsaads', 'asddas', 'dadas', 'dsadas', 'dasdsa'),
('ASD2342ADS', 1, 'Tabletti', 'Apple', 'Ipad 4', 'Minun', 'Kuopio', ':-DDDD'),
('ASDDDSASADDSA', 2, 'sdaasd', 'sdadsds', 'sdadsa', 'dasds', 'dsadsa', 'dasd'),
('dsasda', 2, 'dasdas', '4', 'dsasda', 'dsadsa', 'dasd', 'sdads');

-- --------------------------------------------------------

--
-- Rakenne taululle `laitetyyppi`
--

DROP TABLE IF EXISTS `laitetyyppi`;
CREATE TABLE IF NOT EXISTS `laitetyyppi` (
  `laite_id` int(11) NOT NULL,
  `laitetyyppi` varchar(45) NOT NULL,
  PRIMARY KEY (`laite_id`),
  UNIQUE KEY `laite_id_UNIQUE` (`laite_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Rakenne taululle `varaus`
--

DROP TABLE IF EXISTS `varaus`;
CREATE TABLE IF NOT EXISTS `varaus` (
  `varaus_id` int(11) NOT NULL AUTO_INCREMENT,
  `kayttaja_id` int(20) NOT NULL,
  `sarjanumero` int(10) NOT NULL,
  `status` varchar(45) NOT NULL,
  `varauspvm` datetime DEFAULT NULL,
  `lainauspvm` datetime DEFAULT NULL,
  `palautuspvm` datetime DEFAULT NULL,
  PRIMARY KEY (`varaus_id`),
  UNIQUE KEY `varaus_id_UNIQUE` (`varaus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
