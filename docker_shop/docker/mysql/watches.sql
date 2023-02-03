-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Brands`;
CREATE TABLE `Brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Brands` (`id`, `brand_name`) VALUES
(1,	'бренд1'),
(2,	'бренд2'),
(3,	'бренд3');

DROP TABLE IF EXISTS `Color`;
CREATE TABLE `Color` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `color` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Color` (`id`, `color`) VALUES
(1,	'красный'),
(2,	'белый'),
(3,	'чёрный'),
(4,	'голубой'),
(5,	'розовый'),
(6,	'зелёный');

DROP TABLE IF EXISTS `Goods`;
CREATE TABLE `Goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(400) NOT NULL,
  `price` double unsigned NOT NULL,
  `product_count` smallint NOT NULL,
  `image` varchar(255) NOT NULL,
  `date_goods` varchar(100) NOT NULL,
  `brand` tinyint unsigned NOT NULL,
  `sex` tinyint unsigned NOT NULL,
  `color` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

INSERT INTO `Goods` (`id`, `product_name`, `product_description`, `price`, `product_count`, `image`, `date_goods`, `brand`, `sex`, `color`) VALUES
(1,	'Watch1',	'Это описание для продажи лота часов №1, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, часы',	100,	5,	'img/watch_buy2.webp',	'31.01.2023',	1,	1,	1),
(2,	'Watch2',	'Это описание для продажи лота часов №2, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, часы',	200,	10,	'img/watch_buy3.webp',	'31.01.2023',	2,	2,	3),
(3,	'Watch3',	'это описание часов 3',	300,	2,	'img/watch_buy1.webp',	'31.01.2023',	2,	3,	5);

DROP TABLE IF EXISTS `Order_item`;
CREATE TABLE `Order_item` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `store_id` tinyint NOT NULL,
  `date_order` date NOT NULL,
  `comment_user` varchar(400) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `Sex`;
CREATE TABLE `Sex` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `sex` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Sex` (`id`, `sex`) VALUES
(1,	'мужской'),
(2,	'женский'),
(3,	'мальчики'),
(4,	'девочки'),
(5,	'унисекс');

DROP TABLE IF EXISTS `Stores`;
CREATE TABLE `Stores` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `Store_name` varchar(20) NOT NULL,
  `Store_adress` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Stores` (`id`, `Store_name`, `Store_adress`) VALUES
(1,	'Магазин1',	'Адрес магаза1'),
(2,	'Магазин2',	'Адрес магаза2'),
(3,	'Магазин3',	'Адрес магаза3');

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `last_name` int DEFAULT NULL,
  `phone` int NOT NULL,
  `email` int NOT NULL,
  `password` int DEFAULT NULL,
  `date` date NOT NULL,
  `adress` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- 2023-01-31 19:11:41
