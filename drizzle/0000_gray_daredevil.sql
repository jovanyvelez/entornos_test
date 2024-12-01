-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Categorias` (
	`categoria_id` text PRIMARY KEY,
	`nombre` text(50),
	`descripcion` text,
	`padre_categoria_id` text,
	FOREIGN KEY (`padre_categoria_id`) REFERENCES `Categorias`(`categoria_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_nombre_categoria` ON `Categorias` (`nombre`);--> statement-breakpoint
CREATE TABLE `ListasPrecios` (
	`lista_precio_id` text PRIMARY KEY,
	`nombre` text(100),
	`descripcion` text
);
--> statement-breakpoint
CREATE INDEX `idx_nombre_lista_precio` ON `ListasPrecios` (`nombre`);--> statement-breakpoint
CREATE TABLE `Clientes` (
	`cliente_id` text PRIMARY KEY,
	`nombre` text(100),
	`apellido` text(100),
	`email` text(150),
	`telefono` text(20),
	`direccion` text,
	`fecha_registro` numeric DEFAULT (CURRENT_TIMESTAMP),
	`lista_precio_id` text,
	FOREIGN KEY (`lista_precio_id`) REFERENCES `ListasPrecios`(`lista_precio_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_lista_precio_cliente` ON `Clientes` (`lista_precio_id`);--> statement-breakpoint
CREATE INDEX `idx_nombre_cliente` ON `Clientes` (`nombre`,`apellido`);--> statement-breakpoint
CREATE TABLE `Productos` (
	`producto_id` text PRIMARY KEY,
	`codigo_barras` text(50),
	`nombre` text(100),
	`descripcion` text,
	`categoria_id` text,
	`marca` text(50),
	`precio_compra` numeric,
	`precio_venta` numeric,
	`stock_total` integer DEFAULT 0,
	`tiene_variantes` numeric DEFAULT (FALSE),
	FOREIGN KEY (`categoria_id`) REFERENCES `Categorias`(`categoria_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_categoria_producto` ON `Productos` (`categoria_id`);--> statement-breakpoint
CREATE INDEX `idx_nombre_producto` ON `Productos` (`nombre`);--> statement-breakpoint
CREATE TABLE `Variantes` (
	`variante_id` text PRIMARY KEY,
	`producto_id` text,
	`talla` text(10),
	`color` text(30),
	`codigo_barras` text(50),
	`stock` integer,
	FOREIGN KEY (`producto_id`) REFERENCES `Productos`(`producto_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_producto_variante` ON `Variantes` (`producto_id`);--> statement-breakpoint
CREATE TABLE `ProductosListaPrecios` (
	`producto_lista_id` text PRIMARY KEY,
	`producto_id` text,
	`variante_id` text,
	`lista_precio_id` text,
	`precio` numeric,
	`fecha_inicio` numeric,
	`fecha_fin` numeric,
	FOREIGN KEY (`lista_precio_id`) REFERENCES `ListasPrecios`(`lista_precio_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variante_id`) REFERENCES `Variantes`(`variante_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`producto_id`) REFERENCES `Productos`(`producto_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Ubicaciones` (
	`ubicacion_id` text PRIMARY KEY,
	`nombre` text(100),
	`departamento` text(50)
);
--> statement-breakpoint
CREATE INDEX `idx_nombre_ubicacion` ON `Ubicaciones` (`nombre`);--> statement-breakpoint
CREATE TABLE `StockUbicacion` (
	`stock_ubicacion_id` text PRIMARY KEY,
	`producto_id` text,
	`variante_id` text,
	`ubicacion_id` text,
	`cantidad` integer,
	FOREIGN KEY (`ubicacion_id`) REFERENCES `Ubicaciones`(`ubicacion_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variante_id`) REFERENCES `Variantes`(`variante_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`producto_id`) REFERENCES `Productos`(`producto_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Pedidos` (
	`pedido_id` text PRIMARY KEY,
	`cliente_id` text,
	`fecha_pedido` numeric DEFAULT (CURRENT_TIMESTAMP),
	`estado` text(50),
	`total` numeric,
	FOREIGN KEY (`cliente_id`) REFERENCES `Clientes`(`cliente_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_cliente_pedido` ON `Pedidos` (`cliente_id`);--> statement-breakpoint
CREATE TABLE `EstadosPedidos` (
	`estado_id` text PRIMARY KEY,
	`pedido_id` text,
	`estado` text(50),
	`fecha_cambio` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos`(`pedido_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `MetodosPago` (
	`metodo_pago_id` text PRIMARY KEY,
	`nombre` text(50),
	`descripcion` text
);
--> statement-breakpoint
CREATE TABLE `Facturas` (
	`factura_id` text PRIMARY KEY,
	`pedido_id` text,
	`fecha_factura` numeric DEFAULT (CURRENT_TIMESTAMP),
	`monto_total` numeric,
	`metodo_pago_id` text,
	`estado` text(50),
	FOREIGN KEY (`metodo_pago_id`) REFERENCES `MetodosPago`(`metodo_pago_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos`(`pedido_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `LogsPedidos` (
	`log_id` text PRIMARY KEY,
	`pedido_id` text,
	`usuario` text(100),
	`cambio` text,
	`fecha_cambio` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos`(`pedido_id`) ON UPDATE no action ON DELETE no action
);

*/