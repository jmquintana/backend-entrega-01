import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
const manager = new ProductManager();
const products = await manager.getProducts();

app.get("/products/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	let limit = parseInt(req.query.limit);
	let limitedProducts = limit ? products.slice(0, limit) : products;

	return res.end(JSON.stringify({ result: limitedProducts }, null, 3));
});

app.get("/products/:pid", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	let productId = parseInt(req.params.pid);
	let filteredProducts = products.filter((product) => product.id === productId);
	let response = filteredProducts.length
		? filteredProducts[0]
		: "Product missing!";

	return res.end(JSON.stringify({ result: response }, null, 3));
});

app.listen(8080, () => {
	console.log("Servidor arriba en el puerto 8080");
});
