-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: weather
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country_code` varchar(255) NOT NULL,
  `longitude` int(11) NOT NULL,
  `latitude` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cities_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` (`id`, `name`, `country_code`, `longitude`, `latitude`, `created_at`, `updated_at`) VALUES (1,'Kropyvnytskyi','UA',48,32,'2017-04-23 20:21:04','2017-04-23 20:21:04');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;

--
-- Table structure for table `forecast`
--

DROP TABLE IF EXISTS `forecast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forecast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `temperature` int(11) DEFAULT NULL,
  `wind_speed` double DEFAULT NULL,
  `wind_deg` double DEFAULT NULL,
  `humidity` double DEFAULT NULL,
  `rain_possibility` double DEFAULT NULL,
  `snow_posibility` double DEFAULT NULL,
  `pressure` double DEFAULT NULL,
  `clouds` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forecast_id_uindex` (`id`),
  KEY `forecast_cities_id_fk` (`city_id`),
  CONSTRAINT `forecast_cities_id_fk` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forecast`
--

/*!40000 ALTER TABLE `forecast` DISABLE KEYS */;
INSERT INTO `forecast` (`id`, `city_id`, `timestamp`, `temperature`, `wind_speed`, `wind_deg`, `humidity`, `rain_possibility`, `snow_posibility`, `pressure`, `clouds`, `created_at`, `updated_at`) VALUES (1,1,'2017-04-24 03:00:00',12,11,35,80,0.6,0,14,12,'2017-04-23 20:29:12','2017-04-23 20:30:53'),(2,1,'2017-04-24 04:00:00',13,12,36,80,0.55,0,14,13,'2017-04-23 20:29:12','2017-04-23 20:30:53'),(3,1,'2017-04-24 05:00:00',14,13,35,85,0.5,0,15,16,'2017-04-23 20:29:12','2017-04-23 20:30:53'),(4,1,'2017-04-24 06:00:00',15,13,35,85,0.5,0,15,16,'2017-04-23 20:29:12','2017-04-23 20:30:53'),(5,1,'2017-04-24 07:00:00',16,13,33,80,0.4,0,15,16,'2017-04-23 20:29:12','2017-04-23 20:30:53'),(6,1,'2017-04-24 08:00:00',17,22,30,70,0.8,0,16,22,'2017-04-23 20:29:12','2017-04-23 20:30:53'),(7,1,'2017-04-24 09:00:00',18,25,31,70,0.9,0,16,22,'2017-04-23 20:29:12','2017-04-23 20:30:53'),(8,1,'2017-04-24 10:00:00',18,28,35,85,1,0,16,22,'2017-04-23 20:29:12','2017-04-23 20:30:53');
/*!40000 ALTER TABLE `forecast` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
