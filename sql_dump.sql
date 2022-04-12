-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: tpphp
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chats_user1_foreign` (`user1`),
  KEY `chats_user2_foreign` (`user2`),
  CONSTRAINT `chats_user1_foreign` FOREIGN KEY (`user1`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chats_user2_foreign` FOREIGN KEY (`user2`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (1,'luckynoob@yahoo.com','luckynoob@yahoo.com','2021-12-03 17:16:07','2021-12-03 17:16:07'),(2,'luckynoob@yahoo.com','wiow@wiow.wiow','2021-12-09 19:17:30','2021-12-09 19:17:30'),(4,'w.hasni49@gmail.com','luckynoob@yahoo.com','2022-01-15 13:57:50','2022-01-15 13:57:50'),(5,'luckynoob@yahoo.com','mmm@mm.com','2022-01-23 12:29:53','2022-01-23 12:29:53');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `levels` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `groups_levels_foreign` (`levels`),
  CONSTRAINT `groups_levels_foreign` FOREIGN KEY (`levels`) REFERENCES `levels` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES ('FIA1-1','FIA1','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA1-2','FIA1','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA1-3','FIA1','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA2-GL-1','FIA2-GL','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA2-GL-2','FIA2-GL','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA2-GL-3','FIA2-GL','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA3-GL-AL-1','FIA3-GL-AL','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA3-GL-AL-2','FIA3-GL-AL','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA3-GL-AL-3','FIA3-GL-AL','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEA-A1-1','LEEA-A1','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEA-A1-2','LEEA-A1','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEA-A1-3','LEEA-A1','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEA-A2-1','LEEA-A2','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEA-A2-2','LEEA-A2','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEA-A2-3','LEEA-A2','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEEA-A3-1','LEEEA-A3','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEEA-A3-2','LEEEA-A3','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEEA-A3-3','LEEEA-A3','2021-10-30 15:03:46','2021-10-30 15:03:46'),('MR-INFO-A1-1','MR-INFO-A1','2021-10-30 15:03:47','2021-10-30 15:03:47'),('MR-INFO-A1-2','MR-INFO-A1','2021-10-30 15:03:47','2021-10-30 15:03:47'),('MR-INFO-A1-3','MR-INFO-A1','2021-10-30 15:03:47','2021-10-30 15:03:47'),('MR-INFO-A2-1','MR-INFO-A2','2021-10-30 15:03:47','2021-10-30 15:03:47'),('MR-INFO-A2-2','MR-INFO-A2','2021-10-30 15:03:47','2021-10-30 15:03:47'),('MR-INFO-A2-3','MR-INFO-A2','2021-10-30 15:03:47','2021-10-30 15:03:47'),('PREPA-A1-1','PREPA-A1','2021-10-30 15:03:46','2021-10-30 15:03:46'),('PREPA-A1-2','PREPA-A1','2021-10-30 15:03:46','2021-10-30 15:03:46'),('PREPA-A1-3','PREPA-A1','2021-10-30 15:03:47','2021-10-30 15:03:47'),('PREPA-A2-1','PREPA-A2','2021-10-30 15:03:47','2021-10-30 15:03:47'),('PREPA-A2-2','PREPA-A2','2021-10-30 15:03:47','2021-10-30 15:03:47'),('PREPA-A2-3','PREPA-A2','2021-10-30 15:03:47','2021-10-30 15:03:47');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES ('FIA1','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA2-GL','2021-10-30 15:03:45','2021-10-30 15:03:45'),('FIA3-GL-AL','2021-10-30 15:03:45','2021-10-30 15:03:45'),('LEEA-A1','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEA-A2','2021-10-30 15:03:46','2021-10-30 15:03:46'),('LEEEA-A3','2021-10-30 15:03:46','2021-10-30 15:03:46'),('MR-INFO-A1','2021-10-30 15:03:47','2021-10-30 15:03:47'),('MR-INFO-A2','2021-10-30 15:03:47','2021-10-30 15:03:47'),('PREPA-A1','2021-10-30 15:03:46','2021-10-30 15:03:46'),('PREPA-A2','2021-10-30 15:03:47','2021-10-30 15:03:47');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sentBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `chat` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_chat_foreign` (`chat`),
  KEY `messages_sentby_foreign` (`sentBy`),
  CONSTRAINT `messages_chat_foreign` FOREIGN KEY (`chat`) REFERENCES `chats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_sentby_foreign` FOREIGN KEY (`sentBy`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (2,'luckynoob@yahoo.com','wiow',1,'2021-12-03 17:25:59','2021-12-03 17:25:59'),(3,'luckynoob@yahoo.com','wiow',1,'2021-12-03 18:43:17','2021-12-03 18:43:17'),(4,'luckynoob@yahoo.com','wiow',1,'2021-12-03 18:44:06','2021-12-03 18:44:06'),(5,'luckynoob@yahoo.com','wiow',1,'2021-12-03 18:52:55','2021-12-03 18:52:55'),(6,'luckynoob@yahoo.com','wiow',1,'2021-12-03 18:55:06','2021-12-03 18:55:06'),(7,'luckynoob@yahoo.com','wiow',1,'2021-12-03 18:59:09','2021-12-03 18:59:09'),(8,'luckynoob@yahoo.com','wiow',1,'2021-12-03 18:59:22','2021-12-03 18:59:22'),(9,'luckynoob@yahoo.com','wiow',1,'2021-12-03 19:00:11','2021-12-03 19:00:11'),(10,'luckynoob@yahoo.com','wiow',2,'2021-12-09 19:17:31','2021-12-09 19:17:31'),(11,'luckynoob@yahoo.com','wiou',2,'2021-12-09 19:58:57','2021-12-09 19:58:57'),(12,'luckynoob@yahoo.com','wiouw',2,'2021-12-10 20:51:23','2021-12-10 20:51:23'),(13,'luckynoob@yahoo.com','wiouw',2,'2021-12-10 20:52:54','2021-12-10 20:52:54'),(14,'luckynoob@yahoo.com','another wiouw',2,'2021-12-10 20:54:02','2021-12-10 20:54:02'),(15,'wiow@wiow.wiow','another wiow',2,'2021-12-10 21:00:39','2021-12-10 21:00:39'),(17,'luckynoob@yahoo.com','wiow',2,'2021-12-19 17:50:27','2021-12-19 17:50:27'),(18,'wiow@wiow.wiow','baraa',2,'2021-12-19 18:15:29','2021-12-19 18:15:29'),(19,'wiow@wiow.wiow','some other wiow',2,'2021-12-27 20:29:01','2021-12-27 20:29:01'),(20,'wiow@wiow.wiow','some other wiow',2,'2021-12-27 20:31:38','2021-12-27 20:31:38'),(21,'wiow@wiow.wiow','some other wiow',2,'2021-12-27 20:33:45','2021-12-27 20:33:45'),(22,'wiow@wiow.wiow','hjg',2,'2021-12-27 20:34:00','2021-12-27 20:34:00'),(23,'wiow@wiow.wiow','hjg',2,'2021-12-27 20:37:31','2021-12-27 20:37:31'),(24,'wiow@wiow.wiow','hjg',2,'2021-12-27 20:37:43','2021-12-27 20:37:43'),(25,'wiow@wiow.wiow','more wiows',2,'2021-12-27 20:37:55','2021-12-27 20:37:55'),(26,'wiow@wiow.wiow','wiows',2,'2021-12-27 20:50:23','2021-12-27 20:50:23'),(27,'luckynoob@yahoo.com','ty',2,'2021-12-27 20:50:51','2021-12-27 20:50:51'),(28,'wiow@wiow.wiow','wiows',2,'2021-12-27 21:02:01','2021-12-27 21:02:01'),(29,'luckynoob@yahoo.com','wiiii',2,'2021-12-27 21:02:16','2021-12-27 21:02:16'),(30,'luckynoob@yahoo.com','wiiii',2,'2021-12-27 21:02:23','2021-12-27 21:02:23'),(31,'luckynoob@yahoo.com','ohio',2,'2021-12-30 21:21:56','2021-12-30 21:21:56'),(32,'luckynoob@yahoo.com','wiow',2,'2021-12-30 21:55:09','2021-12-30 21:55:09'),(33,'luckynoob@yahoo.com','wiwo',2,'2021-12-30 21:58:41','2021-12-30 21:58:41'),(34,'luckynoob@yahoo.com','twtwtwt',2,'2021-12-30 22:00:40','2021-12-30 22:00:40'),(35,'wiow@wiow.wiow','more wiows',2,'2021-12-30 22:22:48','2021-12-30 22:22:48'),(36,'wiow@wiow.wiow','more wiows',2,'2021-12-30 22:34:36','2021-12-30 22:34:36'),(37,'wiow@wiow.wiow','wazzup',2,'2021-12-30 22:38:24','2021-12-30 22:38:24'),(38,'luckynoob@yahoo.com','nhark tayb',2,'2021-12-30 22:52:30','2021-12-30 22:52:30'),(39,'luckynoob@yahoo.com','wiow',2,'2021-12-30 22:52:43','2021-12-30 22:52:43'),(40,'luckynoob@yahoo.com','wrqwrqwr',2,'2021-12-30 22:53:39','2021-12-30 22:53:39'),(41,'luckynoob@yahoo.com','wqr',2,'2021-12-30 22:59:05','2021-12-30 22:59:05'),(42,'wiow@wiow.wiow','wazzup',2,'2021-12-30 22:59:24','2021-12-30 22:59:24'),(43,'luckynoob@yahoo.com','wqr',2,'2021-12-30 23:00:44','2021-12-30 23:00:44'),(44,'luckynoob@yahoo.com','wqrwqrwqr',2,'2021-12-30 23:02:28','2021-12-30 23:02:28'),(45,'luckynoob@yahoo.com','wqr',2,'2021-12-30 23:03:50','2021-12-30 23:03:50'),(46,'luckynoob@yahoo.com','wqrwqrwqr',2,'2021-12-30 23:05:11','2021-12-30 23:05:11'),(47,'luckynoob@yahoo.com','wwwww',2,'2022-01-01 21:18:27','2022-01-01 21:18:27'),(48,'luckynoob@yahoo.com','hehhehehe',2,'2022-01-01 21:19:54','2022-01-01 21:19:54'),(49,'luckynoob@yahoo.com','rqwrqwrqwr',2,'2022-01-01 21:20:47','2022-01-01 21:20:47'),(50,'luckynoob@yahoo.com','wqrqw',2,'2022-01-01 21:22:56','2022-01-01 21:22:56'),(51,'luckynoob@yahoo.com','dqwd',2,'2022-01-01 21:23:17','2022-01-01 21:23:17'),(52,'luckynoob@yahoo.com','qwf',2,'2022-01-01 21:24:17','2022-01-01 21:24:17'),(53,'wiow@wiow.wiow','hello sir',2,'2022-01-01 21:35:05','2022-01-01 21:35:05'),(57,'wiow@wiow.wiow','cvbnm,./',2,'2022-01-08 12:32:49','2022-01-08 12:32:49'),(58,'w.hasni49@gmail.com','everybody live together why dont we live together',4,'2022-01-15 13:57:50','2022-01-15 13:57:50'),(59,'luckynoob@yahoo.com','tell my tell my oooooooh',4,'2022-01-15 13:58:25','2022-01-15 13:58:25'),(60,'luckynoob@yahoo.com','hello world!',5,'2022-01-23 12:29:54','2022-01-23 12:29:54'),(61,'mmm@mm.com','yo wassup !',5,'2022-01-23 12:30:06','2022-01-23 12:30:06'),(62,'luckynoob@yahoo.com','aaslama',5,'2022-01-23 13:25:52','2022-01-23 13:25:52'),(63,'luckynoob@yahoo.com','aaslama',5,'2022-01-23 13:25:56','2022-01-23 13:25:56'),(64,'luckynoob@yahoo.com','tell me why tell me why',4,'2022-02-04 17:42:05','2022-02-04 17:42:05');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (33,'2014_10_12_000000_create_users_table',1),(34,'2014_10_12_100000_create_password_resets_table',1),(35,'2019_08_19_000000_create_failed_jobs_table',1),(36,'2019_12_14_000001_create_personal_access_tokens_table',1),(37,'2021_10_15_125641_create_levels_table',1),(38,'2021_10_16_114153_create_groups_table',1),(39,'2021_10_16_124848_add_group_to_users_table',1),(40,'2021_10_31_170901_add_activation_token_to_users',2),(41,'2021_11_05_153310_add_reset_token_to_users',3),(42,'2021_11_10_190829_remove_id_columns',4),(43,'2021_11_10_173953_create_chat_table',5),(44,'2021_11_10_165459_create_message_table',6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (68,'App\\Models\\User','mariem@mariem.mariem','appToken','a4b92a5b93c8105ace1ed0029a3d8d8bb4e3e49f1581679002e849204c5f8d0d','[\"*\"]',NULL,'2021-11-11 09:08:06','2021-11-11 09:08:06'),(69,'App\\Models\\User','luckynoob@yahoo.com','appToken','375dadfb3ef1b028e718e551157fe078cd99418522358b2e5bdea7c3278847ed','[\"*\"]','2021-11-14 15:20:13','2021-11-13 12:16:46','2021-11-14 15:20:13'),(70,'App\\Models\\User','luckynoob@yahoo.com','appToken','3198e5214446ca3b691fd68eec182773f3bb994651106e98a3a9a8d8c9d4758b','[\"*\"]','2021-11-13 12:30:12','2021-11-13 12:29:55','2021-11-13 12:30:12'),(71,'App\\Models\\User','luckynoob@yahoo.com','appToken','06a36fa4a146e130c3f6624605a57fd88f03f8a76d9f11a9c973fe5c50eb4d18','[\"*\"]',NULL,'2021-11-28 17:29:17','2021-11-28 17:29:17'),(72,'App\\Models\\User','luckynoob@yahoo.com','appToken','a4873662ac596f25eb80126f16936bb3651cea96df054f32d1294b96a81a83d4','[\"*\"]','2021-11-28 17:35:14','2021-11-28 17:33:27','2021-11-28 17:35:14'),(73,'App\\Models\\User','luckynoob@yahoo.com','appToken','268f719fb8a7d6079be81b5ab54926a66391ed1b31ef26deee11475ec7638f29','[\"*\"]','2022-01-15 14:01:32','2021-12-03 14:18:53','2022-01-15 14:01:32'),(74,'App\\Models\\User','luckynoob@yahoo.com','appToken','c37c10bdc5a2b5325899b551a1d9de2b7b1b86305acfdcd872e34072386b9690','[\"*\"]','2021-12-10 20:54:53','2021-12-03 17:03:44','2021-12-10 20:54:53'),(75,'App\\Models\\User','wiow@wiow.com','appToken','60796579ee697e11e64a99a186d8a8977fd0838838b9f4edece88256b2fa21d1','[\"*\"]',NULL,'2021-12-07 20:16:41','2021-12-07 20:16:41'),(76,'App\\Models\\User','www@www.ww','appToken','58e124acb67ca81e1e8d59e9e3b68f7825a9de57ba8bfacfc1ed51d33e7894da','[\"*\"]',NULL,'2021-12-07 20:17:40','2021-12-07 20:17:40'),(77,'App\\Models\\User','wiow@wiow.wiow','appToken','65a33d7217e7521e4bdc836b2e3aa174b62a62cab7e793edaf64ec1efa7abbf2','[\"*\"]',NULL,'2021-12-07 20:24:19','2021-12-07 20:24:19'),(78,'App\\Models\\User','wiow@wiow.ww','appToken','538163d8cabafe1419d94aae500ba493edca22305630969ca76bf93e0402070f','[\"*\"]',NULL,'2021-12-07 21:43:41','2021-12-07 21:43:41'),(79,'App\\Models\\User','wiow@wiow.wiow','appToken','7d27b1a017d33e29e7aa5c5e1d27407d2c047925caa8b5ac16c240ae4e0f8532','[\"*\"]','2021-12-30 22:59:24','2021-12-09 19:16:25','2021-12-30 22:59:24'),(80,'App\\Models\\User','wiow@wiow.wiow','appToken','7163145a48a9b768e70d70b0e770d86c0994cc7546f23e2f67913d90e48f4145','[\"*\"]','2022-01-01 21:45:02','2022-01-01 21:32:54','2022-01-01 21:45:02'),(81,'App\\Models\\User','wiow@wiow.ww','appToken','e2e21a02722dae0b023bc56f92787543a798d792d48f1bf4da6f48b38e9f4b27','[\"*\"]','2022-01-01 22:00:56','2022-01-01 21:48:15','2022-01-01 22:00:56'),(82,'App\\Models\\User','wiow@wiow.wiow','appToken','c0bb2e94082ee6b482b7b63ec104b091b3a1dc342079cef328368cd2efac2e03','[\"*\"]','2022-01-08 12:57:33','2022-01-08 12:32:38','2022-01-08 12:57:33'),(83,'App\\Models\\User','w.hasni49@gmail.com','appToken','1720adb2e18d039e1eccb3083dec1c2b9c0a5013e2d03ab7c482446e847883a1','[\"*\"]',NULL,'2022-01-15 13:52:50','2022-01-15 13:52:50'),(84,'App\\Models\\User','w.hasni49@gmail.com','appToken','7e5b3ae53dfb1e47d2f70363d0a9546696612bfde414ac0bad0a8b3444c6e544','[\"*\"]','2022-01-15 14:40:33','2022-01-15 13:56:56','2022-01-15 14:40:33'),(85,'App\\Models\\User','luckynoob@yahoo.com','appToken','b480252458d42bc2e1e1738ad9eb581b22f25c9fa67331522cf33794b7a17bcf','[\"*\"]','2022-02-04 17:43:29','2022-01-23 12:24:48','2022-02-04 17:43:29'),(86,'App\\Models\\User','mmm@mm.com','appToken','778e87ff47c6da0d9c3cd42a8558598e6e2030b9171a46d6866e45d857d761c2','[\"*\"]',NULL,'2022-01-23 12:26:45','2022-01-23 12:26:45'),(87,'App\\Models\\User','mmm@mm.com','appToken','1d095e5ab0d411881ba58bb6e62f824e43c0233c1a2ff283c14af792a8cd7dad','[\"*\"]','2022-01-23 12:37:39','2022-01-23 12:29:07','2022-01-23 12:37:39'),(88,'App\\Models\\User','mmm@mm.com','appToken','cec2047dc4421c21fbd2f55bddda48d8d192c3125458b528bdd9f0e7d1a3f455','[\"*\"]','2022-01-23 13:25:59','2022-01-23 13:25:36','2022-01-23 13:25:59'),(89,'App\\Models\\User','somedude@someemail.com','appToken','3529c2942b682ec3920719245557b906aa36358ac7b4a8fdfaeee2672568dbab','[\"*\"]',NULL,'2022-02-04 17:41:16','2022-02-04 17:41:16');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'etudiant',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `activation_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `users_group_foreign` (`group`),
  CONSTRAINT `users_group_foreign` FOREIGN KEY (`group`) REFERENCES `groups` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('somebodyawesome','luckynoob@yahoo.com',NULL,'$2y$10$XDDs1NYp7eZbjuOJ0DikJ.vsUp3.RkvNITWKaXfc2zfPLNKPdIcSG','etudiant',NULL,'2021-10-30 15:06:07','2022-02-04 17:40:25','FIA2-GL-3',NULL,NULL),('bachar','mmm@mm.com',NULL,'$2y$10$4YKOU6VdhqorG7ORMQtPPuFIZHHmhtj47ywH.8UqW7GuHiNZBKh2O','etudiant',NULL,'2022-01-23 12:26:45','2022-01-23 12:27:30','FIA2-GL-3','TK590BvBat4f9RUp',NULL),('some dude','somedude@someemail.com',NULL,'$2y$10$Y5G0FnaUjXMZsfM5BbuQDOW4Ebfv8EgEgYe4eLY/0svtXwKCzkQi6','etudiant',NULL,'2022-02-04 17:41:16','2022-02-04 17:41:16','FIA2-GL-3','cPaBzmRSJ289bUOt',NULL),('wejden hasni','w.hasni49@gmail.com',NULL,'$2y$10$CTYQWbQZMcgtO8g6NfS7cOnCaDmVjB5ggZXHz/uE1CWsdvnQ1SMAG','etudiant',NULL,'2022-01-15 13:52:50','2022-01-15 13:55:11','FIA2-GL-3','a2HpXAtNy07zerHD',NULL),('somebodyawful','wiow@wiow.wiow',NULL,'$2y$10$CMY.eV3Vl7j6Rf3KKtDjVuvKVVQLTtbLeSqoYC78Anxjto6pw50dm','etudiant',NULL,'2021-12-07 20:24:19','2021-12-07 20:24:19','FIA2-GL-3','Ee0sq8YThBqmX5Sx',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-13  0:29:36
