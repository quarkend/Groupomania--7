Use groupomania;
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `ownerId` int unsigned NOT NULL,
  `postId` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ownerId` (`ownerId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb3;
LOCK TABLES `comments` WRITE;
INSERT INTO
  `comments`
VALUES
  (
    3,
    ' image',
    8,
    4,
    '2021-07-05 09:41:46',
    '2021-07-05 09:41:46'
  ),(
    7,
    'C\'utf8mb3',
    8,
    12,
    '2021-07-07 09:23:31',
    '2021-07-07 09:23:31'
  );
  /*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `posts`
  --
  DROP TABLE IF EXISTS `posts`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `title` text NOT NULL,
    `content` text NOT NULL,
    `image` varchar(255) DEFAULT NULL,
    `ownerId` int unsigned NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY `ownerId` (`ownerId`),
    CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb3;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `posts`
  --
  LOCK TABLES `posts` WRITE;
  /*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO
  `posts`
VALUES
  (
    4,
    'Em image',
    'MINIMUM image',
    'http://localhost:3300/images/121625405174619.jpg',
    3,
    '2021-07-04 13:26:14',
    '2021-07-04 13:26:14'
  ),(
    6,
    ' post',
    'MAXLOGMEMBERS',
    'http://localhost:3300/images/11625562355788.jpg',
    8,
    '2021-07-06 09:05:55',
    '2021-07-06 09:05:55'
  ),(
    11,
    'Un nouveau wall ',
    'Est-ce qu\'une personne a la référence ? \n\n',
    'http://localhost:3300/images/AW1625579937068.jpg',
    3,
    '2021-07-06 13:58:57',
    '2021-07-06 13:58:57'
  ),(
    12,
    'Voici un petit gif pour changer',
    'C\'localhost ?',
    'http://localhost:3300/images/cat1625585418833.gif',
    3,
    '2021-07-06 15:30:18',
    '2021-07-06 15:30:18'
  ),(
    13,
    'group',
    'J\'lo',
    'http://localhost:3300/images/178709207_2623454887954240_8053856671065887010_n1625649876464.jpg',
    8,
    '2021-07-07 09:24:36',
    '2021-07-07 09:24:36'
  );
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `email` varchar(180) NOT NULL,
    `username` varchar(60) NOT NULL,
    `roles` json NOT NULL,
    `password` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`),
    UNIQUE KEY `username` (`username`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb3;
LOCK TABLES `users` WRITE;
INSERT INTO
  `users`
VALUES
  (
    1,
    'efeeff@gro.com',
    'feefe',
    '[\"USER\"]',
    '$2b$10$J.R4dRmWx7A2iCL4ZKWCWufwKCEi47f2/3pSFysW2cyfl5TkYnnde',
    '2021-06-30 13:25:45',
    '2021-06-30 13:25:45'
  ),(
    2,
    'pmp2@grourrp.com',
    'pmp2',
    '[\"USER\"]',
    '$2b$10$hdOXH1Gke0ZYu5xS1j7BgePpdWqIxWTPy8uPxOZwy7/7fnSKvojYW',
    '2021-06-30 13:28:09',
    '2021-06-30 13:28:09'
  ),(
    3,
    'lojj@group.com',
    'administr',
    '[\"ADMIN\"]',
    '$2b$10$W2QU4jE.ucum12Ey8p7VxenoOHcv6xoZ/F72KOPj8q0SaK/St1Q/q',
    '2021-06-30 14:43:32',
    '2021-06-30 14:43:32'
  ),(
    8,
    'torrto@group.com',
    'Torrto',
    '[\"USER\"]',
    '$2b$10$cIIzFd/RPMLN/snEfaf5Z.DYvfxkzlJfcH1L3fsYG4xWOgA.AJP3a',
    '2021-07-04 09:37:23',
    '2021-07-04 09:37:23'
  );
UNLOCK TABLES;