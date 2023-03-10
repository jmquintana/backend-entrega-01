import ProductManager from "../ProductManager.js";
import { Router } from "express";
// import { uploader } from "../utils.js";

const router = Router();
const manager = new ProductManager();
const products = await manager.getProducts();

router.get("/", (req, res) => {
	let limit = parseInt(req.query.limit);
	let limitedProducts = limit ? products.slice(0, limit) : products;
	return res.send({ status: "Success", result: limitedProducts });
});

router.get("/:pid", (req, res) => {
	let productId = parseInt(req.params.pid);
	let filteredProducts = products.filter((product) => product.id === productId);
	let result = filteredProducts.length
		? filteredProducts[0]
		: "Product missing!";

	return res.send({ status: "Success", result });
});

// router.get("/", (req, res) => {
// 	res.send({ status: "Success", payload: products });
// });

// router.post("/", uploader.single("file"), (req, res) => {
// 	if (!req.file) {
// 		return res
// 			.status(400)
// 			.send({ status: "Error", payload: "No se pudo guardar la imagen" });
// 	}

// 	let product = req.body;

// 	product.thumbnail = req.file.path;
// 	products.push(product);
// 	res.send({ status: "Success", payload: "Product added" });
// });

export default router;
