-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 20 juin 2020 à 21:26
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `comptebancaire`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `numCarte` varchar(16) NOT NULL,
  `nom` varchar(40) NOT NULL,
  `prenom` varchar(40) NOT NULL,
  `dateN` date NOT NULL,
  `mail` varchar(100) NOT NULL,
  `tel` varchar(8) NOT NULL,
  `mdp` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`numCarte`, `nom`, `prenom`, `dateN`, `mail`, `tel`, `mdp`) VALUES
('3254109574123684', 'karaa', 'eya', '1991-06-06', 'eyakaraa93a@gmail.com', '57845631', 'cf96f05c16a6c0b78f78e2ceaa725bb201e90296a8617bf3705b5480045db73b'),
('8741236201284562', 'ben rhouma', 'sinda', '1991-08-14', 'benrhouma@gmail.com', '54123478', 'aace44873edcd6bf97fc27760a35c530a800c3b8a409d00d84daad6a9445ed42');

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

CREATE TABLE `compte` (
  `id` int(11) NOT NULL,
  `solde` double NOT NULL,
  `decouvert` double DEFAULT NULL,
  `client` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`id`, `solde`, `decouvert`, `client`) VALUES
(1, 3500, 0, '3254109574123684'),
(2, 0, 3500, '3254109574123684'),
(6, 0, 0, '3254109574123684');

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE `employe` (
  `id` int(11) NOT NULL,
  `nom` varchar(40) NOT NULL,
  `prenom` varchar(40) NOT NULL,
  `tel` varchar(8) NOT NULL,
  `type` enum('admin','chefAgence','caissier') NOT NULL,
  `superieur` int(11) DEFAULT NULL,
  `login` varchar(100) NOT NULL,
  `mdp` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `employe`
--

INSERT INTO `employe` (`id`, `nom`, `prenom`, `tel`, `type`, `superieur`, `login`, `mdp`) VALUES
(1, 'admin', 'admin', '', 'admin', NULL, 'admin', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225'),
(2, 'sayeh', 'hiba', '27353077', 'chefAgence', 1, 'sayehhiba@yahoo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
(21, 'ben mahmoud', 'issa', '54789145', 'chefAgence', 1, 'issa1990@yahoo.com', 'ba723435a66e490530c3efdfeac868e06fde6e35dcc43fa8528fb1b2c9411ef5'),
(30, 'yahmdi', 'jana', '98410233', 'caissier', 2, 'yahmdi97@yahoo.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5');

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

CREATE TABLE `historique` (
  `id` int(11) NOT NULL,
  `soldeIntial` double NOT NULL,
  `decouvertIntial` double NOT NULL,
  `soldeFinale` double NOT NULL,
  `decouvertFinale` double NOT NULL,
  `date` date NOT NULL,
  `compte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `historique`
--

INSERT INTO `historique` (`id`, `soldeIntial`, `decouvertIntial`, `soldeFinale`, `decouvertFinale`, `date`, `compte`) VALUES
(1, 1000, 0, 1500, 0, '2020-04-01', 2),
(2, 2500, 0, 0, 1000, '2020-04-01', 1),
(8, 4000, 0, 0, 2000, '2020-06-01', 6),
(9, 0, 2000, 0, 0, '2020-06-01', 6),
(10, 0, 0, 4000, 0, '2020-06-03', 6),
(11, 4000, 0, 0, 0, '2020-06-03', 6),
(12, 0, 0, 4000, 0, '2020-06-03', 6),
(13, 4000, 0, 0, 0, '2020-06-03', 6),
(14, 0, 2500, 1500, 0, '2020-06-03', 2),
(17, 1500, 0, 0, 500, '2020-06-07', 2),
(18, 0, 500, 1500, 0, '2020-06-07', 2),
(19, 3000, 0, 1000, 0, '2020-06-07', 1),
(20, 1000, 0, 3000, 0, '2020-06-07', 1),
(21, 3000, 0, 1000, 0, '2020-06-07', 1),
(22, 1500, 0, 3500, 0, '2020-06-07', 2),
(23, 3500, 0, 1000, 0, '2020-06-07', 2),
(24, 1000, 0, 3500, 0, '2020-06-07', 1),
(25, 1000, 0, 0, 1000, '2020-06-07', 2),
(26, 0, 1000, 0, 3500, '2020-06-07', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`numCarte`);

--
-- Index pour la table `compte`
--
ALTER TABLE `compte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client` (`client`);

--
-- Index pour la table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `superieur` (`superieur`);

--
-- Index pour la table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compte` (`compte`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `compte`
--
ALTER TABLE `compte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `employe`
--
ALTER TABLE `employe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `historique`
--
ALTER TABLE `historique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `compte`
--
ALTER TABLE `compte`
  ADD CONSTRAINT `compte_ibfk_1` FOREIGN KEY (`client`) REFERENCES `client` (`numCarte`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `employe_ibfk_1` FOREIGN KEY (`superieur`) REFERENCES `employe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `historique`
--
ALTER TABLE `historique`
  ADD CONSTRAINT `historique_ibfk_1` FOREIGN KEY (`compte`) REFERENCES `compte` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
