import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

/*

app.get("/api/products/:pid", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	let productId = parseInt(req.params.pid);
	let filteredProducts = products.filter((product) => product.id === productId);
	let response = filteredProducts.length
		? filteredProducts[0]
		: "Product missing!";

	return res.end(JSON.stringify({ result: response }, null, 3));
});
*/

app.listen(8080, () => {
	console.log("Servidor arriba en el puerto 8080");
});
