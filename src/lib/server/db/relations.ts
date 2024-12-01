import { relations } from "drizzle-orm/relations";
import { categorias, listasPrecios, clientes, productos, variantes, productosListaPrecios, ubicaciones, stockUbicacion, pedidos, estadosPedidos, metodosPago, facturas, logsPedidos } from "./schema";

export const categoriasRelations = relations(categorias, ({one, many}) => ({
	categoria: one(categorias, {
		fields: [categorias.padreCategoriaId],
		references: [categorias.categoriaId],
		relationName: "categorias_padreCategoriaId_categorias_categoriaId"
	}),
	categorias: many(categorias, {
		relationName: "categorias_padreCategoriaId_categorias_categoriaId"
	}),
	productos: many(productos),
}));

export const clientesRelations = relations(clientes, ({one, many}) => ({
	listasPrecio: one(listasPrecios, {
		fields: [clientes.listaPrecioId],
		references: [listasPrecios.listaPrecioId]
	}),
	pedidos: many(pedidos),
}));

export const listasPreciosRelations = relations(listasPrecios, ({many}) => ({
	clientes: many(clientes),
	productosListaPrecios: many(productosListaPrecios),
}));

export const productosRelations = relations(productos, ({one, many}) => ({
	categoria: one(categorias, {
		fields: [productos.categoriaId],
		references: [categorias.categoriaId]
	}),
	variantes: many(variantes),
	productosListaPrecios: many(productosListaPrecios),
	stockUbicacions: many(stockUbicacion),
}));

export const variantesRelations = relations(variantes, ({one, many}) => ({
	producto: one(productos, {
		fields: [variantes.productoId],
		references: [productos.productoId]
	}),
	productosListaPrecios: many(productosListaPrecios),
	stockUbicacions: many(stockUbicacion),
}));

export const productosListaPreciosRelations = relations(productosListaPrecios, ({one}) => ({
	listasPrecio: one(listasPrecios, {
		fields: [productosListaPrecios.listaPrecioId],
		references: [listasPrecios.listaPrecioId]
	}),
	variante: one(variantes, {
		fields: [productosListaPrecios.varianteId],
		references: [variantes.varianteId]
	}),
	producto: one(productos, {
		fields: [productosListaPrecios.productoId],
		references: [productos.productoId]
	}),
}));

export const stockUbicacionRelations = relations(stockUbicacion, ({one}) => ({
	ubicacione: one(ubicaciones, {
		fields: [stockUbicacion.ubicacionId],
		references: [ubicaciones.ubicacionId]
	}),
	variante: one(variantes, {
		fields: [stockUbicacion.varianteId],
		references: [variantes.varianteId]
	}),
	producto: one(productos, {
		fields: [stockUbicacion.productoId],
		references: [productos.productoId]
	}),
}));

export const ubicacionesRelations = relations(ubicaciones, ({many}) => ({
	stockUbicacions: many(stockUbicacion),
}));

export const pedidosRelations = relations(pedidos, ({one, many}) => ({
	cliente: one(clientes, {
		fields: [pedidos.clienteId],
		references: [clientes.clienteId]
	}),
	estadosPedidos: many(estadosPedidos),
	facturas: many(facturas),
	logsPedidos: many(logsPedidos),
}));

export const estadosPedidosRelations = relations(estadosPedidos, ({one}) => ({
	pedido: one(pedidos, {
		fields: [estadosPedidos.pedidoId],
		references: [pedidos.pedidoId]
	}),
}));

export const facturasRelations = relations(facturas, ({one}) => ({
	metodosPago: one(metodosPago, {
		fields: [facturas.metodoPagoId],
		references: [metodosPago.metodoPagoId]
	}),
	pedido: one(pedidos, {
		fields: [facturas.pedidoId],
		references: [pedidos.pedidoId]
	}),
}));

export const metodosPagoRelations = relations(metodosPago, ({many}) => ({
	facturas: many(facturas),
}));

export const logsPedidosRelations = relations(logsPedidos, ({one}) => ({
	pedido: one(pedidos, {
		fields: [logsPedidos.pedidoId],
		references: [pedidos.pedidoId]
	}),
}));