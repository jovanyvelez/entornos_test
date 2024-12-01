import { sqliteTable, index, foreignKey, text, numeric, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const categorias = sqliteTable("Categorias", {
	categoriaId: text("categoria_id").primaryKey(),
	nombre: text({ length: 50 }),
	descripcion: text(),
	padreCategoriaId: text("padre_categoria_id"),
},
(table) => {
	return {
		idxNombreCategoria: index("idx_nombre_categoria").on(table.nombre),
		categoriasPadreCategoriaIdCategoriasCategoriaIdFk: foreignKey(() => ({
			columns: [table.padreCategoriaId],
			foreignColumns: [table.categoriaId],
			name: "Categorias_padre_categoria_id_Categorias_categoria_id_fk"
		})),
	}
});

export const listasPrecios = sqliteTable("ListasPrecios", {
	listaPrecioId: text("lista_precio_id").primaryKey(),
	nombre: text({ length: 100 }),
	descripcion: text(),
},
(table) => {
	return {
		idxNombreListaPrecio: index("idx_nombre_lista_precio").on(table.nombre),
	}
});

export const clientes = sqliteTable("Clientes", {
	clienteId: text("cliente_id").primaryKey(),
	nombre: text({ length: 100 }),
	apellido: text({ length: 100 }),
	email: text({ length: 150 }),
	telefono: text({ length: 20 }),
	direccion: text(),
	fechaRegistro: numeric("fecha_registro").default(sql`(CURRENT_TIMESTAMP)`),
	listaPrecioId: text("lista_precio_id").references(() => listasPrecios.listaPrecioId),
},
(table) => {
	return {
		idxListaPrecioCliente: index("idx_lista_precio_cliente").on(table.listaPrecioId),
		idxNombreCliente: index("idx_nombre_cliente").on(table.nombre, table.apellido),
	}
});

export const productos = sqliteTable("Productos", {
	productoId: text("producto_id").primaryKey(),
	codigoBarras: text("codigo_barras", { length: 50 }),
	nombre: text({ length: 100 }),
	descripcion: text(),
	categoriaId: text("categoria_id").references(() => categorias.categoriaId),
	marca: text({ length: 50 }),
	precioCompra: numeric("precio_compra"),
	precioVenta: numeric("precio_venta"),
	stockTotal: integer("stock_total").default(0),
	tieneVariantes: numeric("tiene_variantes").default(sql`(FALSE)`),
},
(table) => {
	return {
		idxCategoriaProducto: index("idx_categoria_producto").on(table.categoriaId),
		idxNombreProducto: index("idx_nombre_producto").on(table.nombre),
	}
});

export const variantes = sqliteTable("Variantes", {
	varianteId: text("variante_id").primaryKey(),
	productoId: text("producto_id").references(() => productos.productoId),
	talla: text({ length: 10 }),
	color: text({ length: 30 }),
	codigoBarras: text("codigo_barras", { length: 50 }),
	stock: integer(),
},
(table) => {
	return {
		idxProductoVariante: index("idx_producto_variante").on(table.productoId),
	}
});

export const productosListaPrecios = sqliteTable("ProductosListaPrecios", {
	productoListaId: text("producto_lista_id").primaryKey(),
	productoId: text("producto_id").references(() => productos.productoId),
	varianteId: text("variante_id").references(() => variantes.varianteId),
	listaPrecioId: text("lista_precio_id").references(() => listasPrecios.listaPrecioId),
	precio: numeric(),
	fechaInicio: numeric("fecha_inicio"),
	fechaFin: numeric("fecha_fin"),
});

export const ubicaciones = sqliteTable("Ubicaciones", {
	ubicacionId: text("ubicacion_id").primaryKey(),
	nombre: text({ length: 100 }),
	departamento: text({ length: 50 }),
},
(table) => {
	return {
		idxNombreUbicacion: index("idx_nombre_ubicacion").on(table.nombre),
	}
});

export const stockUbicacion = sqliteTable("StockUbicacion", {
	stockUbicacionId: text("stock_ubicacion_id").primaryKey(),
	productoId: text("producto_id").references(() => productos.productoId),
	varianteId: text("variante_id").references(() => variantes.varianteId),
	ubicacionId: text("ubicacion_id").references(() => ubicaciones.ubicacionId),
	cantidad: integer(),
});

export const pedidos = sqliteTable("Pedidos", {
	pedidoId: text("pedido_id").primaryKey(),
	clienteId: text("cliente_id").references(() => clientes.clienteId),
	fechaPedido: numeric("fecha_pedido").default(sql`(CURRENT_TIMESTAMP)`),
	estado: text({ length: 50 }),
	total: numeric(),
},
(table) => {
	return {
		idxClientePedido: index("idx_cliente_pedido").on(table.clienteId),
	}
});

export const estadosPedidos = sqliteTable("EstadosPedidos", {
	estadoId: text("estado_id").primaryKey(),
	pedidoId: text("pedido_id").references(() => pedidos.pedidoId),
	estado: text({ length: 50 }),
	fechaCambio: numeric("fecha_cambio").default(sql`(CURRENT_TIMESTAMP)`),
});

export const metodosPago = sqliteTable("MetodosPago", {
	metodoPagoId: text("metodo_pago_id").primaryKey(),
	nombre: text({ length: 50 }),
	descripcion: text(),
});

export const facturas = sqliteTable("Facturas", {
	facturaId: text("factura_id").primaryKey(),
	pedidoId: text("pedido_id").references(() => pedidos.pedidoId),
	fechaFactura: numeric("fecha_factura").default(sql`(CURRENT_TIMESTAMP)`),
	montoTotal: numeric("monto_total"),
	metodoPagoId: text("metodo_pago_id").references(() => metodosPago.metodoPagoId),
	estado: text({ length: 50 }),
});

export const logsPedidos = sqliteTable("LogsPedidos", {
	logId: text("log_id").primaryKey(),
	pedidoId: text("pedido_id").references(() => pedidos.pedidoId),
	usuario: text({ length: 100 }),
	cambio: text(),
	fechaCambio: numeric("fecha_cambio").default(sql`(CURRENT_TIMESTAMP)`),
});
