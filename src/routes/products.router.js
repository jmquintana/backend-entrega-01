import ProductManager from "../ProductManager.js";
import { Router } from "express";
// import { uploader } from "../utils.js";

const router = Router();

const manager = new ProductManager();
const products = await manager.getProducts();

router.get("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	let limit = parseInt(req.query.limit);
	let limitedProducts = limit ? products.slice(0, limit) : products;

	return res.end(JSON.stringify({ result: limitedProducts }, null, 3));
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
