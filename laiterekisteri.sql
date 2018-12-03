-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 03.12.2018 klo 22:34
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
  `kayttaja_id` int(100) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Vedos taulusta `kayttaja`
--

INSERT INTO `kayttaja` (`kayttaja_id`, `kayttajanimi`, `salasana`, `tyyppi`, `tyyppi_selite`, `luontipvm`, `etunimi`, `sukunimi`, `puhnro`, `osoite`) VALUES
(1, 'admin@admin.com', 'admin', 1, 'Admin', '2018-11-13', 'Admin', 'Admin', '1234', 'asd'),
(2, 'asd@asd.com', 'asd', 2, 'Customer', '2018-11-13', NULL, NULL, NULL, NULL),
(3, 'sam@sam.com', 'asd', 1, 'Admin', '2018-11-14', 'Sam', 'Mikkonen', '1234565', 'Tilipitappi');

-- --------------------------------------------------------

--
-- Rakenne taululle `laite`
--

DROP TABLE IF EXISTS `laite`;
CREATE TABLE IF NOT EXISTS `laite` (
  `laite_id` int(10) NOT NULL AUTO_INCREMENT,
  `sarjanumero` varchar(45) NOT NULL,
  `tyyppi_id` int(10) NOT NULL,
  `laite_merkki` varchar(45) NOT NULL,
  `laite_malli` varchar(45) NOT NULL,
  `omistaja` varchar(45) NOT NULL,
  `sijainti` varchar(45) DEFAULT NULL,
  `kuvaus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`laite_id`),
  UNIQUE KEY `sarjanumero_UNIQUE` (`sarjanumero`),
  KEY `tyyppi_id` (`tyyppi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Vedos taulusta `laite`
--

INSERT INTO `laite` (`laite_id`, `sarjanumero`, `tyyppi_id`, `laite_merkki`, `laite_malli`, `omistaja`, `sijainti`, `kuvaus`) VALUES
(1, '3sadf2323', 1, 'Apple', 'iPhone 6s', 'Joku', 'Kellari', 'Siisti, pieni ja hyväkuntoinen'),
(2, '1s1gfhd', 2, 'Samsung', 'GS7', 'Riku', 'Keskusta', 'Toimiva peli'),
(5, '123', 3, 'Fiskars', 'Halkoma', 'Kalle', 'Perämetsä', 'Terävä'),
(8, 'tsd1wd3', 2, 'Apple', 'iPad 3', 'Esko', 'Kuopio', 'Näppärä'),
(10, 'ghsr2wb', 3, 'Black\'n\'Decker', 'Halkoma', 'Metsuri', 'Perämetsä', 'Terävähkö'),
(12, 'hh2t46', 1, 'Samsung', 'Galaxy Note', 'Pertti', 'Kuopio', 'Kiva'),
(14, 'gsi12opgh3', 4, 'Mora', 'Vuolu', 'Junkkari', 'Pohjanmaa', 'Perus hippastelu-malli'),
(18, '2ir43e', 2, 'Apple', 'iPad 4', 'Pentti', 'Kuopio', 'Kiva'),
(19, 'gs9000XDD', 6, 'Strong', 'GS9000', 'Jorma', 'Turku', 'Kunnollinen vehje'),
(20, 'H345s', 3, 'Fiskars', 'Karvanen', 'Hessu', 'Kuopio', 'Karvaa kaikille'),
(21, 'hi3t678', 10, 'Hitachi', 'HI3000', 'Sirpa', 'Pori', 'Hyvin surisee'),
(22, 'hi2sdf2', 10, 'Hitachi', 'HI2000', 'Irmeli', 'Kuopio', 'Sur sur');

-- --------------------------------------------------------

--
-- Rakenne taululle `laitetyyppi`
--

DROP TABLE IF EXISTS `laitetyyppi`;
CREATE TABLE IF NOT EXISTS `laitetyyppi` (
  `tyyppi_id` int(11) NOT NULL AUTO_INCREMENT,
  `tyyppi_nimi` varchar(45) NOT NULL,
  PRIMARY KEY (`tyyppi_id`),
  UNIQUE KEY `laite_id_UNIQUE` (`tyyppi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Vedos taulusta `laitetyyppi`
--

INSERT INTO `laitetyyppi` (`tyyppi_id`, `tyyppi_nimi`) VALUES
(1, 'Puhelin'),
(2, 'Tabletti'),
(3, 'Kirves'),
(4, 'Puukko'),
(6, 'Kompressori'),
(8, 'Vasara'),
(10, 'Vibraattori');

-- --------------------------------------------------------

--
-- Rakenne taululle `varauksentila`
--

DROP TABLE IF EXISTS `varauksentila`;
CREATE TABLE IF NOT EXISTS `varauksentila` (
  `status` int(11) NOT NULL AUTO_INCREMENT,
  `tila` varchar(45) NOT NULL,
  PRIMARY KEY (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Vedos taulusta `varauksentila`
--

INSERT INTO `varauksentila` (`status`, `tila`) VALUES
(1, 'Varattu'),
(2, 'Lainassa'),
(3, 'Palautettu'),
(4, 'Huolto'),
(5, 'Muu');

-- --------------------------------------------------------

--
-- Rakenne taululle `varaus`
--

DROP TABLE IF EXISTS `varaus`;
CREATE TABLE IF NOT EXISTS `varaus` (
  `varaus_id` int(11) NOT NULL AUTO_INCREMENT,
  `kayttaja_id` int(20) NOT NULL,
  `laite_id` int(10) NOT NULL,
  `status` int(10) NOT NULL,
  `varauspvm` datetime DEFAULT NULL,
  `lainauspvm` datetime DEFAULT NULL,
  `palautuspvm` datetime DEFAULT NULL,
  PRIMARY KEY (`varaus_id`),
  UNIQUE KEY `varaus_id_UNIQUE` (`varaus_id`),
  KEY `kayttaja_id` (`kayttaja_id`),
  KEY `sarjanumero` (`laite_id`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Vedos taulusta `varaus`
--

INSERT INTO `varaus` (`varaus_id`, `kayttaja_id`, `laite_id`, `status`, `varauspvm`, `lainauspvm`, `palautuspvm`) VALUES
(3, 3, 5, 1, '2018-12-03 00:00:00', '2018-12-18 09:00:00', '2018-12-21 18:00:00');

--
-- Rajoitteet vedostauluille
--

--
-- Rajoitteet taululle `laite`
--
ALTER TABLE `laite`
  ADD CONSTRAINT `laite_ibfk_1` FOREIGN KEY (`tyyppi_id`) REFERENCES `laitetyyppi` (`tyyppi_id`) ON UPDATE CASCADE;

--
-- Rajoitteet taululle `varaus`
--
ALTER TABLE `varaus`
  ADD CONSTRAINT `varaus_ibfk_1` FOREIGN KEY (`kayttaja_id`) REFERENCES `kayttaja` (`kayttaja_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `varaus_ibfk_2` FOREIGN KEY (`laite_id`) REFERENCES `laite` (`laite_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `varaus_ibfk_3` FOREIGN KEY (`status`) REFERENCES `varauksentila` (`status`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
