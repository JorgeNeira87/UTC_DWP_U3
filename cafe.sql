-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-03-2024 a las 20:05:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cafe`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacen`
--

CREATE TABLE `almacen` (
  `ProductoId` int(11) NOT NULL,
  `Stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `PedidoId` int(11) NOT NULL,
  `UsuarioId` int(11) NOT NULL,
  `Total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `ProductoId` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` text NOT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Tipo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ProductoId`, `Nombre`, `Descripcion`, `Precio`, `Tipo`) VALUES
(1, 'Americano', 'Es un derivado del café expreso, aunque con una cantidad más alta de agua. Como resultado, se obtiene una bebida menos potente en cuanto a cafeína y con un sabor menos amargo y más dulce.', 23.32, 'caffe'),
(3, 'Capuchino', 'Es muy similar al café con leche, aunque con ligeros matices que hacen de este tipo de bebida una delicia. Un cappuccino se prepara con un café espresso y partes iguales de leche y crema o espuma de leche.', 28.36, 'caffe'),
(4, 'Mocca', 'Se utiliza chocolate ya sea en forma de sirope. El café mocca parte de la elaboración tradicional del café con leche, rematando la preparación con ese sabor dulce.', 28.63, 'caffe'),
(5, 'Latte', 'Se utiliza un café expreso como base y añadiremos leche caliente y leche vaporizada para conseguir espuma de leche para que su sabor sea espectacular.', 25.20, 'caffe'),
(6, 'Irish', 'Espresso doble se prepara una parte de whisky y otra de crema o nata montada consiguiendo un sabor dulce y amargo a la vez.', 20.50, 'caffe'),
(7, 'Expresso', 'Consiste en realizar la infusión de café llevando a ebullición el agua para que entren en contacto con los granos de café molidos.', 23.60, 'caffe'),
(8, 'Bombón', 'Es una bebida más dulce del café con leche. Su elaboración se consigue sustituyendo la leche normal por leche condensada.', 35.40, 'caffe'),
(9, 'Carajillo', 'Tiene como base un café expreso, al que se le añade una cantidad de licor y puede ser brandy, coñac, whisky, ron o baileys.', 25.40, 'caffe'),
(10, 'Lungo', 'Es una variedad elaborada con la misma cantidad de café que un espresso, pero emplenado mas cantidad de agua.', 25.30, 'caffe'),
(11, 'Ristretto', 'Es una elaboración similar al expreso por utilizar la misma cantidad de café pero empleando un porcion menor de agua.', 28.46, 'caffe'),
(12, 'Machiatto', 'Es similar a un café expresso pero añadiendo una pequeña cantidad de leche para que tiña el el color del cafe.', 24.70, 'caffe'),
(13, 'Cafe con Leche', 'Se a semejanza con la preparación del café latte macchiato pero la diferencia en cuanto a cómo se preparan ambos.', 32.00, 'caffe'),
(14, 'Vienés', 'Se utiliza crema y es similar al café expreso pero una proporción inferior a la del cafe', 40.50, 'caffe'),
(15, 'Frappé', 'Se utiliza un café instantáneo molido, al que se le añade hielo y crema de leche.', 80.05, 'caffe'),
(16, 'Azteca', 'La bebida incluye además del café, el hielo y la leche, una o dos bolas de helado.', 90.50, 'caffe'),
(17, 'Caramelo', 'Caramelo con chantilli en café expresso con hielos de argentina. ', 85.90, 'postres'),
(18, 'Tiramisú', 'Postre italiano suave, cremoso, humedo y lleno de sabor exquisito.', 50.49, 'postres'),
(19, 'Cheesecakes', 'Un verdadero postre clasico creado para el desayuno de campeones', 37.29, 'postres'),
(20, 'Roles de Canela', 'Un verdadero postre clasico creado para el desayuno de campeones', 25.50, 'postres'),
(21, 'Pasteles', 'Rebanadas de pasteles de chocolate, zanahoria, frutas, coco', 32.67, 'postres'),
(22, 'Donas', 'Donas de sabbores de chocolate, fresa, glasiado, chispas', 20.30, 'postres'),
(23, 'Galletas', 'De diferentes sabores chispas de chocolate, avena, integral', 15.28, 'postres'),
(24, 'Agua en botella', 'Una botella de evian de 338 ml', 38.50, 'bebidas'),
(25, 'Jugos', 'Bebidas en lata de marca monster', 50.26, 'bebidas'),
(26, 'Té', 'Te caliente de mansanilla', 26.39, 'bebidas'),
(27, 'Pan tostado', 'Pan de la marca del gobierno cubano tostado', 20.19, 'maridajes'),
(28, 'Ensalada', 'Los ingredientes lechuga, tomate, adereso de elccion, queso cabra, y una proteina a elecion', 40.47, 'maridajes'),
(29, 'Arte Coffe', 'Le diseñamos un arete o diseño a tu cafe', 120.60, 'maridajes'),
(31, 'Osilletas', 'Deliciosas y crujientes galletas de mantequilla en forma de osito', 12.60, 'maridajes'),
(32, 'Fresas con crema y nutella', 'Deliciosas Fresas con crema de chantillí y un toque de nuestra deliciosa avellana de chocolate (Nutella) ', 60.00, 'maridajes'),
(33, 'Mixed berry tart', 'Tarta de frutos rojos', 55.00, 'maridajes'),
(34, 'Frapuccino Unicornio', 'Bebida con decoración de unicornio', 80.00, 'postres'),
(35, 'Café Frío', 'Café frio con decoración', 120.00, 'bebidas'),
(36, 'Malteada', 'Malteada de fresa, chocolate y galleta', 55.00, 'postres'),
(37, 'Jugos Naturales', 'Bebida natural con variedad de sabores', 25.00, 'bebidas'),
(38, 'Bebida Rosa', 'Bebida rosa de 500ml', 62.50, 'bebidas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relacionalpedido`
--

CREATE TABLE `relacionalpedido` (
  `RelacionalId` int(11) NOT NULL,
  `UsuarioId` int(11) NOT NULL,
  `PedidoId` int(11) NOT NULL,
  `ProductoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `UsuarioId` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Foto` longblob NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Telefono` varchar(20) NOT NULL,
  `Genero` varchar(1) NOT NULL,
  `Contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `VentaId` int(11) NOT NULL,
  `PedidoId` int(11) NOT NULL,
  `Comentarios` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `almacen`
--
ALTER TABLE `almacen`
  ADD KEY `ProductoId` (`ProductoId`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`PedidoId`),
  ADD KEY `UsuarioId` (`UsuarioId`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ProductoId`);

--
-- Indices de la tabla `relacionalpedido`
--
ALTER TABLE `relacionalpedido`
  ADD PRIMARY KEY (`RelacionalId`),
  ADD KEY `UsuarioId` (`UsuarioId`,`PedidoId`,`ProductoId`),
  ADD KEY `ProductoId` (`ProductoId`),
  ADD KEY `PedidoId` (`PedidoId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuarioId`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD KEY `PedidoId` (`PedidoId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `PedidoId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ProductoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `relacionalpedido`
--
ALTER TABLE `relacionalpedido`
  MODIFY `RelacionalId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuarioId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `almacen`
--
ALTER TABLE `almacen`
  ADD CONSTRAINT `almacen_ibfk_1` FOREIGN KEY (`ProductoId`) REFERENCES `productos` (`ProductoId`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`UsuarioId`) REFERENCES `usuarios` (`UsuarioId`);

--
-- Filtros para la tabla `relacionalpedido`
--
ALTER TABLE `relacionalpedido`
  ADD CONSTRAINT `relacionalpedido_ibfk_2` FOREIGN KEY (`ProductoId`) REFERENCES `productos` (`ProductoId`),
  ADD CONSTRAINT `relacionalpedido_ibfk_3` FOREIGN KEY (`PedidoId`) REFERENCES `pedidos` (`PedidoId`),
  ADD CONSTRAINT `relacionalpedido_ibfk_4` FOREIGN KEY (`UsuarioId`) REFERENCES `usuarios` (`UsuarioId`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`PedidoId`) REFERENCES `pedidos` (`PedidoId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
