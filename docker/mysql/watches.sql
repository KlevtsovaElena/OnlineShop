-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

INSERT INTO `brands` (`id`, `brand_name`) VALUES
(1,	'бренд1'),
(2,	'бренд2'),
(3,	'бренд3');

DROP TABLE IF EXISTS `color`;
CREATE TABLE `color` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `color` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `color` (`id`, `color`) VALUES
(1,	'красный'),
(2,	'белый'),
(3,	'чёрный'),
(4,	'голубой'),
(5,	'розовый'),
(6,	'зелёный');

DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `sex` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

INSERT INTO `gender` (`id`, `sex`) VALUES
(1,	'мужской'),
(2,	'женский'),
(3,	'мальчики'),
(4,	'девочки'),
(5,	'унисекс');

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(400) NOT NULL,
  `price` double unsigned NOT NULL,
  `product_count` smallint NOT NULL,
  `image` varchar(255) NOT NULL,
  `date_goods` datetime NOT NULL,
  `brand` tinyint unsigned NOT NULL,
  `sex` tinyint unsigned NOT NULL,
  `color` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

INSERT INTO `goods` (`id`, `product_name`, `product_description`, `price`, `product_count`, `image`, `date_goods`, `brand`, `sex`, `color`) VALUES
(1,	'Watch1',	'Это описание для продажи лота часов №1, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, часы',	100,	5,	'img/watch_buy2.webp',	'2031-01-20 23:00:00',	1,	1,	1),
(2,	'Watch2',	'Это описание для продажи лота часов №2, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, самые крутые, стильные, моднеы, часы',	200,	10,	'img/watch_buy3.webp',	'2031-01-20 23:00:00',	2,	2,	3),
(3,	'Watch3',	'это описание часов 3',	300,	2,	'img/watch_buy1.webp',	'2031-01-20 23:00:00',	2,	3,	5),
(4,	'Watch4',	'ghkjdfghjsdhgasdhvkdfhbadvnhkdjfbvsikvn;d часы 4',	400,	1,	'img/watch_buy4.webp',	'2023-02-11 12:12:02',	3,	1,	2),
(5,	'Watch5',	'ghkjdfghjsdhgasdhvkdfhbadvnhkdjfbvsikvn;d часы 5',	500,	3,	'img/funWatch_buy3.webp',	'2023-02-11 12:12:02',	2,	1,	3),
(6,	'Watch6',	'ghkjdfghjsdhgasdhvkdfhbadvnhkdjfbvsikvn;d часы 6',	600,	3,	'img/funWatch_buy2.jpg',	'2023-02-11 15:11:27',	2,	1,	3);

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `store_id` tinyint NOT NULL,
  `date_order` date NOT NULL,
  `comment_user` varchar(400) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `stores`;
CREATE TABLE `stores` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `Store_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Store_adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

INSERT INTO `stores` (`id`, `Store_name`, `Store_adress`) VALUES
(1,	'Магазин1',	'Адрес магаза1'),
(2,	'Магазин2',	'Адрес магаза2'),
(3,	'Магазин3',	'Адрес магаза3');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
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


-- 2023-02-11 15:14:37
