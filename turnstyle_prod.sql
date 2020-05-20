-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 20 mai 2020 à 23:49
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
-- Base de données : `turnstyle_prod`
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
(1, 'noir', '#000000', 'rgb(0,0,0)'),
(2, 'bleu nuit', '#2c3e50', 'rgb(44, 62, 80)'),
(3, 'gris', '#7f8c8d', 'rgb(127, 140, 141)'),
(4, 'blanc', '#f8f9f9', 'rgb(248, 249, 249)'),
(5, 'jaune', '#f1c40f', 'rgb(241, 196, 15)'),
(6, 'carotte', '#f39c12', 'rgb(230, 126, 34)'),
(7, 'rose', '#ec7063', 'rgb(236, 112, 99)'),
(8, 'alizarine', '#e74c3c', 'rgb(231, 76, 60)'),
(9, 'émeraude', '#2ecc71', 'rgb(46, 204, 113)'),
(10, 'turquoise', '#1abc9c', 'rgb(26, 188, 156)'),
(11, 'bleu', '#2980b9', 'rgb(41, 128, 185)'),
(12, 'glycine', '#8e44ad', 'rgb(142, 68, 173)');

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
(14, 'T-shirt', '/uploads/1590008189484-hmgoepprod.jpg', 1590008189, NULL, 2, 72, 3, 13),
(15, 'Veste', '/uploads/1590008226343-hmgoepprod1.jpg', 1590008226, NULL, 2, 4, 1, 7),
(16, 'shirt', '/uploads/1590008250204-hmgoepprod2.jpg', 1590008250, NULL, 2, 3, 3, 11),
(17, 't-shirt', '/uploads/1590008316106-hmgoepprod3.jpg', 1590008316, NULL, 2, 3, 3, 13),
(18, 'short vert', '/uploads/1590008342724-hmgoepprod.jpg', 1590008342, NULL, 2, 14, 3, 5),
(19, 'short', '/uploads/1590008363580-hmgoepprod1.jpg', 1590008363, NULL, 2, 29, 3, 6),
(20, 'short jean', '/uploads/1590008391444-hmgoepprod2.jpg', 1590008391, NULL, 2, 88, 2, 2),
(21, 'Basquette', '/uploads/1590008420080-hmgoepprod.jpg', 1590008420, NULL, 2, 151, 4, 16),
(22, 'Tatane', '/uploads/1590008441742-hmgoepprod0.jpg', 1590008441, NULL, 2, 155, 2, 15),
(23, 'Claquette', '/uploads/1590008465177-hmgoepprod1.jpg', 1590008465, NULL, 2, 87, 3, 17),
(24, 'Patrick', '/uploads/1590008501926-hmgoepprod2.jpg', 1590008501, NULL, 2, 77, 4, 15),
(25, 'Pant', '/uploads/1590008525915-hmgoepprod.jpg', 1590008525, 1590009254, 2, 35, 3, 1),
(26, 'pant beige', '/uploads/1590008548628-hmgoepprod0.jpg', 1590008548, NULL, 2, 50, 2, 2);

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
(15, 14, 4),
(16, 15, 2),
(17, 15, 3),
(18, 16, 1),
(19, 17, 11),
(20, 18, 9),
(21, 19, 10),
(22, 20, 1),
(23, 21, 4),
(24, 22, 2),
(25, 22, 4),
(26, 23, 1),
(27, 24, 8),
(28, 24, 5),
(30, 26, 6),
(31, 25, 9);

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
(12, 14, 1),
(13, 14, 8),
(14, 15, 3),
(15, 15, 7),
(16, 16, 8),
(17, 17, 12),
(18, 18, 8),
(19, 19, 1),
(20, 20, 12),
(21, 21, 8),
(22, 22, 12),
(23, 22, 1),
(24, 22, 8),
(25, 22, 5),
(26, 23, 10),
(27, 23, 9),
(28, 23, 3),
(29, 23, 7),
(30, 24, 11),
(32, 26, 12),
(33, 25, 9);

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

--
-- Déchargement des données de la table `outfit`
--

INSERT INTO `outfit` (`id_outfit`, `label_outfit`, `creation_date_outfit`, `modification_date_outfit`, `user_id_user`) VALUES
(5, 'Tenue decontract', 1590008575, NULL, 2),
(6, 'Mode cool', 1590008588, NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `outfit_has_garment`
--

CREATE TABLE `outfit_has_garment` (
  `id_assoc_outfit_garment` int(11) NOT NULL,
  `outfit_id_outfit` int(11) NOT NULL,
  `garment_id_garment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `outfit_has_garment`
--

INSERT INTO `outfit_has_garment` (`id_assoc_outfit_garment`, `outfit_id_outfit`, `garment_id_garment`) VALUES
(13, 5, 25),
(14, 5, 16),
(15, 5, 24),
(16, 6, 15),
(17, 6, 19),
(18, 6, 24);

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
(2, 'Utilisateur2', 'mail@mail.com', '$2b$10$JrwOT4.XmaAMBHVvhnxehuZIuYyuj2NQ.tGR2bswTXEzMqOLhqBMS', '/avatar5.png', 1, 1, 'dwglO6R8Q9j8UC2MRyMZXBwC85mxax6z', 1588667775, NULL);

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
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11013;

--
-- AUTO_INCREMENT pour la table `garment`
--
ALTER TABLE `garment`
  MODIFY `id_garment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `garment_has_color`
--
ALTER TABLE `garment_has_color`
  MODIFY `id_assoc_garment_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `garment_has_style`
--
ALTER TABLE `garment_has_style`
  MODIFY `id_assoc_garment_style` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `outfit`
--
ALTER TABLE `outfit`
  MODIFY `id_outfit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `outfit_has_garment`
--
ALTER TABLE `outfit_has_garment`
  MODIFY `id_assoc_outfit_garment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
