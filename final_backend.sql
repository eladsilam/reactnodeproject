-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: מרץ 01, 2025 בזמן 09:38 PM
-- גרסת שרת: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_backend`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `author_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `author_id`, `created_at`, `image_url`) VALUES
(2, 'Healthy Eating Habits', 'Eating healthy is crucial for longevity...', 2, '2025-02-14 11:34:56', NULL),
(3, 'Travel Guide to Japan', 'Japan offers a mix of tradition and modernity...', 3, '2025-02-14 11:34:56', NULL),
(4, 'Understanding Blockchain', 'Blockchain technology is revolutionizing finance...', 4, '2025-02-14 11:34:56', NULL),
(5, 'The Benefits of Meditation', 'Meditation improves mental and physical health...', 5, '2025-02-14 11:34:56', NULL),
(7, 'Space Exploration in 2025', 'NASA and SpaceX are planning new missions...', 2, '2025-02-14 11:34:56', NULL),
(8, 'How to Start a Business', 'Entrepreneurship requires dedication and strategy...', 3, '2025-02-14 11:34:56', NULL),
(9, 'Elad&&Shai Last Shot', 'We are trying to post new article', 4, '2025-02-14 11:34:56', NULL);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password_hash` text NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `created_at`) VALUES
(2, 'user2', 'user2@example.com', '$2a$10$zHE46d9NrzijDouzow/cXeXprUXpljSPuEh/FT4.LFf9WIAe9DMSu', 'user', '2025-02-14 11:34:56'),
(3, 'user3', 'user3@example.com', '$2a$10$1kkrhD4LhHeRSNdlVUSJg.nOfhGlEdPxwAsRu2zAahxYFIjWerqSG', 'user', '2025-02-14 11:34:56'),
(4, 'user4', 'user4@example.com', '$2a$10$Fj4DPHUBptP7UKkn6lV8rWTeG27cpQFx2UtgoRc.t6QLD4F45BQCa', 'user', '2025-02-14 11:34:56'),
(5, 'user5', 'user5@example.com', '$2a$10$u0F67v1AC8OFYgkxXRGwWkL7mXnb7h5DN1.mj9L.VLv.TbZkzJHga', 'user', '2025-02-14 11:34:56'),
(6, 'shaisalem15', 'eladsila8@gmail.com', '$2b$10$tmi1a59lR1uwaQD21f3s0.b7jCJfgIg9dXAhvh4zDtC2llbgU2jvm', 'admin', '2025-02-14 13:24:45'),
(7, '123123', 'elad@gmail.com', '$2b$10$dCX6MD5ZOzjCv7vSOePBquPgrwlSxiMgvXRaOnVmylkdksl.masEy', 'user', '2025-02-19 17:06:03'),
(8, 'shais', 'shaisalem15@gmail.com', '$2b$10$ADXwqf.0e1egV5aDt5kQqef7iaAk479IqAmJbYFJtWdMcP0kQ5NoW', 'admin', '2025-02-19 22:33:35'),
(10, 'sadsad', 'asdasd@gmail.com', '$2b$10$iX5Qbj.4GsUrxFumK/Yj5uLuExsp7QBDwGp0h7syeKrb.Pjg8fQn2', 'user', '2025-02-20 01:51:07'),
(11, 'GoogleMoogle', 'shaisalem153@gmail.com', '$2b$10$3zL0u7CLO4XogOo1gmHvZ.SuBoqabfzOczOWC9GCDrGVnZ6QzwDvS', 'admin', '2025-02-20 03:04:56'),
(14, 'admin', 'admin@gmail.com', '$2b$10$0olmcizytKo.98Os7A3aMuo1P.M8BagIW3cN.SsjLUR7xNMX2WJRK', 'admin', '2025-03-01 20:37:47');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_author` (`author_id`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH,
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD UNIQUE KEY `email_2` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
