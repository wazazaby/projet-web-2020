-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 07 mai 2020 à 15:31
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdd_dev`
--

-- --------------------------------------------------------

--
-- Structure de la table `brand`
--

CREATE TABLE `brand` (
  `id_brand` int(11) NOT NULL,
  `label_brand` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `brand`
--

INSERT INTO `brand` (`id_brand`, `label_brand`) VALUES
(1, 'Abercrombie & Fitch'),
(2, 'Absorba'),
(3, 'Adidas'),
(4, 'Aigle'),
(5, 'Alice à Paris'),
(6, 'Alife Kickin'),
(7, 'Alpha Industries'),
(8, 'American Apparel'),
(9, 'American College USA'),
(10, 'American Retro'),
(11, 'American Vintage'),
(12, 'Antik Batik'),
(13, 'Antonelle'),
(14, 'Armor Lux'),
(15, 'Asics'),
(16, 'Ba&Sh'),
(17, 'Backtee'),
(18, 'Balenciaga'),
(19, 'Balmain'),
(20, 'Barbour'),
(21, 'Belair'),
(22, 'Bellfield'),
(23, 'Benetton'),
(24, 'Bershka'),
(25, 'Best Mountain'),
(26, 'Betty Barclay'),
(27, 'Big Star'),
(28, 'Billabong'),
(29, 'Bizzbee'),
(30, 'Blaumax'),
(31, 'Blend She'),
(32, 'Blomor'),
(33, 'Boss'),
(34, 'Brice'),
(35, 'Burberry'),
(36, 'Burton'),
(37, 'C&A'),
(38, 'Cacharel'),
(39, 'Cache Cache'),
(40, 'Calvin Klein'),
(41, 'Camaïeu'),
(42, 'Canterbury'),
(43, 'Carnet de Vol'),
(44, 'Caroll'),
(45, 'Catimini'),
(46, 'Celio'),
(47, 'Cent\'s'),
(48, 'Chanel'),
(49, 'Chevignon'),
(50, 'Chicco'),
(51, 'Chipie'),
(52, 'Chloé'),
(53, 'Comptoir des Cotonniers'),
(54, 'Cop.Copine'),
(55, 'Damart'),
(56, 'DC Shoes'),
(57, 'DDP'),
(58, 'Deeluxe 74'),
(59, 'Desigual'),
(60, 'Devred'),
(61, 'Diesel'),
(62, 'Elie Saab'),
(63, 'Esprit'),
(64, 'Etam'),
(65, 'Father and Sons'),
(66, 'Fendi'),
(67, 'Fila'),
(68, 'G-Star'),
(69, 'Gap'),
(70, 'Grain de Malice'),
(71, 'Guess'),
(72, 'H&M'),
(73, 'H.Landers'),
(74, 'Hollister'),
(75, 'Ikks'),
(76, 'Iro'),
(77, 'JACK & JONES'),
(78, 'Jacqueline Riu'),
(79, 'Jennyfer'),
(80, 'Joshua Perets'),
(81, 'Juicy Couture'),
(82, 'Jules'),
(83, 'K-Way'),
(84, 'Kaporal'),
(85, 'Kappa'),
(86, 'Karen Millen'),
(87, 'Karl Lagerfeld'),
(88, 'Kenzo'),
(89, 'Kookaï'),
(90, 'Lacoste'),
(91, 'Lafuma'),
(92, 'LC Waikiki'),
(93, 'Le coq sportif'),
(94, 'Le Temps des Cerises'),
(95, 'Lee'),
(96, 'Lee Cooper'),
(97, 'Levi\'s'),
(98, 'Little Marcel'),
(99, 'Liu Jo'),
(100, 'Lulu Castagnette'),
(101, 'Mango'),
(102, 'Manoukian'),
(103, 'Marc Jacobs'),
(104, 'Marc O\'Polo'),
(105, 'Mim'),
(106, 'Morgan'),
(107, 'Naf Naf'),
(108, 'New Balance'),
(109, 'New Look'),
(110, 'Nickelson'),
(111, 'Nike'),
(112, 'Nina Ricci'),
(113, 'O\'Neill'),
(114, 'Oakwood'),
(115, 'Olymp'),
(116, 'Only & Sons'),
(117, 'Oxbow'),
(118, 'Part Two'),
(119, 'Paul & Joe'),
(120, 'Pepe Jeans'),
(121, 'Petit Bateau'),
(122, 'Pimkie'),
(123, 'Primark'),
(124, 'Promod'),
(125, 'Pull and Bear'),
(126, 'Puma'),
(127, 'Quechua'),
(128, 'Quiksilver'),
(129, 'Ralph Lauren'),
(130, 'Redskins'),
(131, 'Redsoul'),
(132, 'Reebok'),
(133, 'Reef'),
(134, 'Roxy'),
(135, 'Serge Blanco'),
(136, 'Sisley'),
(137, 'Stradivarius'),
(138, 'Tally Weijl'),
(139, 'Tape à l\'oeil'),
(140, 'Ted Baker'),
(141, 'Teddy Smith'),
(142, 'The North Face'),
(143, 'Tiger of Sweden'),
(144, 'Timberland'),
(145, 'Tommy Hilfiger'),
(146, 'Topman'),
(147, 'Topshop'),
(148, 'Valentino'),
(149, 'Van Laack'),
(150, 'Vans'),
(151, 'Ventcouvert'),
(152, 'Versace'),
(153, 'Vertbaudet'),
(154, 'Vicomte A.'),
(155, 'Vingino'),
(156, 'Zapa'),
(157, 'Zara');

-- --------------------------------------------------------

--
-- Structure de la table `color`
--

CREATE TABLE `color` (
  `id_color` int(11) NOT NULL,
  `label_color` varchar(255) NOT NULL,
  `hex_color` varchar(255) NOT NULL,
  `rgb_color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `color`
--

INSERT INTO `color` (`id_color`, `label_color`, `hex_color`, `rgb_color`) VALUES
(1, 'cyan', '#0ABAB5', 'rgb(10,186,181)'),
(2, 'black', '#000000', 'rgb(0,0,0)'),
(3, 'orange', '#F0810F', 'rgb(240,129,15)');

-- --------------------------------------------------------

--
-- Structure de la table `garment`
--

CREATE TABLE `garment` (
  `id_garment` int(11) NOT NULL,
  `label_garment` varchar(255) NOT NULL,
  `url_img_garment` varchar(255) NOT NULL,
  `creation_date_garment` int(11) NOT NULL,
  `modification_date_garment` int(11) DEFAULT NULL,
  `user_id_user` int(11) NOT NULL,
  `brand_id_brand` int(11) NOT NULL,
  `season_id_season` int(11) NOT NULL,
  `type_id_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Le vêtement en soit est juste un label, mais il est composé d''une couleur, d''une marque, d''une saison et d''un style';

--
-- Déchargement des données de la table `garment`
--

INSERT INTO `garment` (`id_garment`, `label_garment`, `url_img_garment`, `creation_date_garment`, `modification_date_garment`, `user_id_user`, `brand_id_brand`, `season_id_season`, `type_id_type`) VALUES
(1, 'Veste1', '/assets/2/t1.jpg', 1588668413, NULL, 2, 6, 4, 14),
(2, 'Pantalon1', '/assets/2/t2.jpg', 1588668413, NULL, 2, 22, 1, 1),
(3, 'Chemise1', '/assets/2/t3.jpg', 1588668413, NULL, 2, 4, 3, 8),
(6, 'Blouson', '/assets/2/t4.jpg', 1588691720, NULL, 2, 15, 2, 7),
(7, 'New Gianno Nibba', '/assets/2/t5.jpg', 1588691816, NULL, 2, 56, 3, 15);

-- --------------------------------------------------------

--
-- Structure de la table `garment_has_color`
--

CREATE TABLE `garment_has_color` (
  `id_assoc_garment_color` int(11) NOT NULL,
  `garment_id_garment` int(11) NOT NULL,
  `color_id_color` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `garment_has_color`
--

INSERT INTO `garment_has_color` (`id_assoc_garment_color`, `garment_id_garment`, `color_id_color`) VALUES
(1, 1, 2),
(2, 1, 1),
(3, 3, 3),
(4, 3, 1),
(5, 2, 2),
(6, 7, 3),
(7, 6, 2);

-- --------------------------------------------------------

--
-- Structure de la table `garment_has_style`
--

CREATE TABLE `garment_has_style` (
  `id_assoc_garment_style` int(11) NOT NULL,
  `garment_id_garment` int(11) NOT NULL,
  `style_id_style` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `garment_has_style`
--

INSERT INTO `garment_has_style` (`id_assoc_garment_style`, `garment_id_garment`, `style_id_style`) VALUES
(1, 1, 8),
(2, 1, 7),
(3, 2, 2),
(4, 3, 3),
(5, 7, 9);

-- --------------------------------------------------------

--
-- Structure de la table `outfit`
--

CREATE TABLE `outfit` (
  `id_outfit` int(11) NOT NULL,
  `label_outfit` varchar(255) NOT NULL,
  `creation_date_outfit` int(11) NOT NULL,
  `modification_date_outfit` int(11) DEFAULT NULL,
  `user_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Une tenu est composée de 3 vêtements (haut, bas et chaussures)';

-- --------------------------------------------------------

--
-- Structure de la table `outfit_has_garment`
--

CREATE TABLE `outfit_has_garment` (
  `id_assoc_outfit_garment` int(11) NOT NULL,
  `outfit_id_outfit` int(11) NOT NULL,
  `garment_id_garment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `season`
--

CREATE TABLE `season` (
  `id_season` int(11) NOT NULL,
  `label_season` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `season`
--

INSERT INTO `season` (`id_season`, `label_season`) VALUES
(1, 'Hiver'),
(2, 'Printemps'),
(3, 'Été'),
(4, 'Automne');

-- --------------------------------------------------------

--
-- Structure de la table `style`
--

CREATE TABLE `style` (
  `id_style` int(11) NOT NULL,
  `label_style` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `style`
--

INSERT INTO `style` (`id_style`, `label_style`) VALUES
(1, 'Bohème'),
(2, 'Minimaliste'),
(3, 'Tendance/Fashionista'),
(4, 'Naturel/sportive'),
(5, 'Dramatique/Créative'),
(6, 'Féminine/ Romantique'),
(7, 'Workwear'),
(8, 'Casual'),
(9, 'Streetwear'),
(10, 'Rock'),
(11, 'Geek'),
(12, 'BCBG');

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `id_type` int(11) NOT NULL,
  `label_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Types de vetements';

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`id_type`, `label_type`) VALUES
(1, 'Pantalon'),
(2, 'Pantaloncourt'),
(3, 'Jupe'),
(4, 'Minijupe'),
(5, 'Short'),
(6, 'Bermuda'),
(7, 'Blazer'),
(8, 'Chemise'),
(9, 'Débardeur'),
(10, 'Maillot'),
(11, 'Polo'),
(12, 'Pull-over'),
(13, 'Tee-shirt'),
(14, 'Veste'),
(15, 'Chaussure'),
(16, 'Basquette'),
(17, 'Tong'),
(18, 'Talon');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(255) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `pass_user` varchar(255) NOT NULL,
  `url_img_user` varchar(255) DEFAULT NULL,
  `actif_user` int(1) NOT NULL,
  `rgpd_user` int(1) NOT NULL,
  `token_user` varchar(255) NOT NULL,
  `creation_date_user` int(11) NOT NULL,
  `modification_date_user` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Represente un utilisateurs dans notre application';

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `name_user`, `email_user`, `pass_user`, `url_img_user`, `actif_user`, `rgpd_user`, `token_user`, `creation_date_user`, `modification_date_user`) VALUES
(2, 'Utilisateur2', 'mail@mail.com', '$2b$10$JrwOT4.XmaAMBHVvhnxehuZIuYyuj2NQ.tGR2bswTXEzMqOLhqBMS', 'assets/sn.jpg', 1, 1, 'dwglO6R8Q9j8UC2MRyMZXBwC85mxax6z', 1588667775, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id_brand`);

--
-- Index pour la table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id_color`);

--
-- Index pour la table `garment`
--
ALTER TABLE `garment`
  ADD PRIMARY KEY (`id_garment`),
  ADD KEY `fk_vetement_user_idx` (`user_id_user`),
  ADD KEY `fk_vetement_marque1_idx` (`brand_id_brand`),
  ADD KEY `fk_vetement_saison1_idx` (`season_id_season`),
  ADD KEY `fk_garment_type1_idx` (`type_id_type`);

--
-- Index pour la table `garment_has_color`
--
ALTER TABLE `garment_has_color`
  ADD PRIMARY KEY (`id_assoc_garment_color`,`garment_id_garment`,`color_id_color`),
  ADD KEY `fk_vetement_has_couleur_couleur1_idx` (`color_id_color`),
  ADD KEY `fk_vetement_has_couleur_vetement1_idx` (`garment_id_garment`);

--
-- Index pour la table `garment_has_style`
--
ALTER TABLE `garment_has_style`
  ADD PRIMARY KEY (`id_assoc_garment_style`,`garment_id_garment`,`style_id_style`),
  ADD KEY `fk_vetement_has_style_style1_idx` (`style_id_style`),
  ADD KEY `fk_vetement_has_style_vetement1_idx` (`garment_id_garment`);

--
-- Index pour la table `outfit`
--
ALTER TABLE `outfit`
  ADD PRIMARY KEY (`id_outfit`),
  ADD KEY `fk_tenue_user1_idx` (`user_id_user`);

--
-- Index pour la table `outfit_has_garment`
--
ALTER TABLE `outfit_has_garment`
  ADD PRIMARY KEY (`id_assoc_outfit_garment`,`outfit_id_outfit`,`garment_id_garment`),
  ADD KEY `fk_tenue_has_vetement_vetement1_idx` (`garment_id_garment`),
  ADD KEY `fk_tenue_has_vetement_tenue1_idx` (`outfit_id_outfit`);

--
-- Index pour la table `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`id_season`);

--
-- Index pour la table `style`
--
ALTER TABLE `style`
  ADD PRIMARY KEY (`id_style`);

--
-- Index pour la table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_type`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `brand`
--
ALTER TABLE `brand`
  MODIFY `id_brand` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT pour la table `color`
--
ALTER TABLE `color`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `garment`
--
ALTER TABLE `garment`
  MODIFY `id_garment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `garment_has_color`
--
ALTER TABLE `garment_has_color`
  MODIFY `id_assoc_garment_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `garment_has_style`
--
ALTER TABLE `garment_has_style`
  MODIFY `id_assoc_garment_style` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `outfit`
--
ALTER TABLE `outfit`
  MODIFY `id_outfit` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `outfit_has_garment`
--
ALTER TABLE `outfit_has_garment`
  MODIFY `id_assoc_outfit_garment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `season`
--
ALTER TABLE `season`
  MODIFY `id_season` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `style`
--
ALTER TABLE `style`
  MODIFY `id_style` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `type`
--
ALTER TABLE `type`
  MODIFY `id_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `garment`
--
ALTER TABLE `garment`
  ADD CONSTRAINT `fk_garment_type1` FOREIGN KEY (`type_id_type`) REFERENCES `type` (`id_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vetement_marque1` FOREIGN KEY (`brand_id_brand`) REFERENCES `brand` (`id_brand`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vetement_saison1` FOREIGN KEY (`season_id_season`) REFERENCES `season` (`id_season`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vetement_user` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `garment_has_color`
--
ALTER TABLE `garment_has_color`
  ADD CONSTRAINT `fk_vetement_has_couleur_couleur1` FOREIGN KEY (`color_id_color`) REFERENCES `color` (`id_color`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vetement_has_couleur_vetement1` FOREIGN KEY (`garment_id_garment`) REFERENCES `garment` (`id_garment`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `garment_has_style`
--
ALTER TABLE `garment_has_style`
  ADD CONSTRAINT `fk_vetement_has_style_style1` FOREIGN KEY (`style_id_style`) REFERENCES `style` (`id_style`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vetement_has_style_vetement1` FOREIGN KEY (`garment_id_garment`) REFERENCES `garment` (`id_garment`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `outfit`
--
ALTER TABLE `outfit`
  ADD CONSTRAINT `fk_tenue_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `outfit_has_garment`
--
ALTER TABLE `outfit_has_garment`
  ADD CONSTRAINT `fk_tenue_has_vetement_tenue1` FOREIGN KEY (`outfit_id_outfit`) REFERENCES `outfit` (`id_outfit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tenue_has_vetement_vetement1` FOREIGN KEY (`garment_id_garment`) REFERENCES `garment` (`id_garment`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
