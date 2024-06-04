-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2024 at 10:34 AM
-- Server version: 8.0.34
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestion_demandes_ista`
--

-- --------------------------------------------------------

--
-- Table structure for table `demandes`
--

CREATE TABLE `demandes` (
  `id` bigint UNSIGNED NOT NULL,
  `stagiaire_id` bigint UNSIGNED NOT NULL,
  `dateSoumission` date NOT NULL,
  `typeDemande` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'En cours de traitement',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `demandes`
--

INSERT INTO `demandes` (`id`, `stagiaire_id`, `dateSoumission`, `typeDemande`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-03-09', 'Attestation de poursuite', 'Approuvé', '2024-03-09 16:07:09', '2024-03-10 19:14:19'),
(4, 2, '2024-03-09', 'Attestation interruption', 'Approuvé', '2024-03-09 18:18:57', '2024-05-15 22:27:34'),
(8, 5, '2024-03-10', 'Attestation de poursuite', 'En cours de traitement', '2024-03-10 19:24:30', '2024-03-10 19:24:30'),
(9, 1, '2024-03-10', 'Releve de note', 'Rejeté', '2024-03-10 22:33:58', '2024-03-12 13:00:08'),
(10, 1, '2024-03-10', 'Attestation interruption', 'Rejeté', '2024-03-10 23:25:56', '2024-03-10 23:26:50'),
(12, 10, '2024-03-12', 'Attestation de poursuite', 'Rejeté', '2024-03-12 12:36:50', '2024-03-12 13:00:20'),
(13, 10, '2024-03-12', 'Releve de note', 'Approuvé', '2024-03-12 12:37:14', '2024-03-12 12:59:02'),
(15, 12, '2024-03-19', 'Attestation de poursuite', 'En cours de traitement', '2024-03-19 11:22:38', '2024-03-21 00:00:21'),
(16, 12, '2024-03-19', 'Attestation interruption', 'Approuvé', '2024-03-19 11:23:55', '2024-03-19 11:26:04'),
(17, 2, '2024-05-15', 'Attestation de poursuite', 'Rejeté', '2024-05-15 22:21:36', '2024-05-15 22:28:58'),
(18, 14, '2024-05-18', 'Attestation de poursuite', 'Approuvé', '2024-05-18 11:53:05', '2024-05-18 11:53:37');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_03_08_230609_create_stagiaires_table', 1),
(6, '2024_03_09_165444_create_demandes_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stagiaires`
--

CREATE TABLE `stagiaires` (
  `id` bigint UNSIGNED NOT NULL,
  `CIN` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filiere` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `groupe` int DEFAULT NULL,
  `anneeScolaire` int DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stagiaires`
--

INSERT INTO `stagiaires` (`id`, `CIN`, `nom`, `prenom`, `filiere`, `groupe`, `anneeScolaire`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'IL12345', 'Bahri', 'Ilhame', 'Developpement digital', 201, 2023, 'bahri.ilhame@gmail.com', NULL, '$2y$10$GRFm0C6HWJEbihpk2bQbRO55IPc81Ee6WOt8AB3DklYEZPj67BHWu', NULL, '2024-03-09 16:06:51', '2024-03-10 18:04:30'),
(2, 'qw123456', 'Bahri', 'Oussama', 'Developpement digital', 201, 2022, 'oussama@gmail.com', NULL, '$2y$10$aAQpY/YmGBAcjCjoYkcTtuwETLCF0ijK5GzFaZNnK1oLtXtal5qDS', NULL, '2024-03-09 18:15:58', '2024-05-15 22:21:35'),
(3, 'za123456', 'Bahri', 'Abdrahim', 'Infographie', 203, 2019, 'abdrahim@gmail.com', NULL, '$2y$10$2Ps2ffuJHvvKt8kDh4Jw4eTQgqjvVefT4JNG7jpAwXGbYwxPRj/gK', NULL, '2024-03-10 13:11:55', '2024-03-10 14:34:34'),
(4, 'ho12345', 'Cherkaoui', 'Houssam', 'Gestion des entreprises', 108, 2023, 'houssam@gmail.com', NULL, '$2y$10$BrZ8ugazTV8idLX.STKN4OsfhQwbmZoeCMOnmrQXHRwgCEUj44Vs2', NULL, '2024-03-10 14:40:24', '2024-03-10 19:17:24'),
(5, 'di12345', 'Guiri', 'Dikra', 'Developpement digital', 201, 2024, 'dikra@gmail.com', NULL, '$2y$10$5ENcMn9QI93m0L5l8hbiP./2FUvSZE.VUYXJRwidVqjAv2zf76Mbm', NULL, '2024-03-10 19:24:14', '2024-03-10 19:24:30'),
(6, 'zi1234567', 'Bahri', 'Ilhame', 'Gestion des entreprises', 106, 2023, 'ilhame.bah@gmail.com', NULL, '$2y$10$Nl1C9TpaptZggSiM40tG2uAknjgyuSHjIJp0Xg0PBrTrPByONlHKS', NULL, '2024-03-12 10:34:11', '2024-03-21 21:51:03'),
(10, 'ki123456', 'Boulaache', 'karima', 'Developpement digital', 201, 2022, 'boulkarima@gmail.com', NULL, '$2y$10$6tWj8t2YkD96SHlKwDK7pOjlSlW6wJv62VeZWOFQhdOEcI4/1OkdG', NULL, '2024-03-12 12:36:13', '2024-03-12 13:03:42'),
(12, 'hj12345678', 'BAHRI', 'BAHRI', 'Infrastructure digital', 201, 2023, 'bahri.ilhae@gmail.com', NULL, '$2y$10$IjGHZwb912F5bPpjDqmXde.YJ8QaaR7y5D6TzmC8urENeJEh92GIS', NULL, '2024-03-19 11:20:19', '2024-03-19 15:37:49'),
(14, 'er123456', 'bennani', 'hanane', 'Électronique et Électrotechnique', 104, 2023, 'bennani@gmail.com', NULL, '$2y$10$/rL1/9UXRdrU4vYmbJblHO0P5LwLSThWdr/aVBPE2RuogmazQwX/a', NULL, '2024-05-18 10:22:04', '2024-05-18 11:53:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('directeur','gestionnaire') COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `role`, `password`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, 'gest', 'ilhame', 'gest.ilhame@gmail.com', 'gestionnaire', '$2y$10$6dRJEVZ864zcvMp/duQZZuF1c4OwmA.5zSChnKklcasdd5ZW1Wk6G', NULL, NULL, '2024-03-10 17:35:05', '2024-05-21 23:41:39'),
(4, 'direc', 'direc', 'direc@gmail.com', 'directeur', '$2y$10$lrqwoB.EcTuy6bO6nk5IXO3MWPNzkRMPeY5IsQQ5TdNxXn3NpWISO', NULL, NULL, '2024-03-12 10:46:52', '2024-05-21 23:44:07'),
(5, 'Gest', 'dikra', 'gest.dikra@gmail.com', 'gestionnaire', '$2y$10$8XCSeJrqM3FVf1I4C0rJKu0V3HYxBd.U1Xp8Ns5hoNYbx4YPQuNoC', NULL, NULL, '2024-03-12 10:46:52', '2024-05-21 23:42:03'),
(7, 'Gest', 'Karima', 'gestKa@gmail.com', 'gestionnaire', '$2y$10$1rmTsM29bvBi258OcWIMq.JreZ.Tdf8xv4.OG3LJb1ocSqnCzSfpm', NULL, NULL, '2024-03-12 15:52:49', '2024-05-21 23:40:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `demandes`
--
ALTER TABLE `demandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `demandes_stagiaire_id_foreign` (`stagiaire_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `stagiaires`
--
ALTER TABLE `stagiaires`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stagiaires_cin_unique` (`CIN`),
  ADD UNIQUE KEY `stagiaires_email_unique` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `demandes`
--
ALTER TABLE `demandes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stagiaires`
--
ALTER TABLE `stagiaires`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `demandes`
--
ALTER TABLE `demandes`
  ADD CONSTRAINT `demandes_stagiaire_id_foreign` FOREIGN KEY (`stagiaire_id`) REFERENCES `stagiaires` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
