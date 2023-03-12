import fs from "fs";

export default class ProductManager {
	constructor() {
		this.path = "./src/files/products.json";
	}

	#writeFile = async (content) => {
		await fs.promises.writeFile(this.path, JSON.stringify(content, null, "\t"));
	};

	#readFile = async (filePath) => await fs.promises.readFile(filePath, "utf-8");

	#isValidProduct = (product) => {
		const hasTitle = product.title ?? "" !== "";
		const hasDescription = product.description ?? "" !== "";
		const hasCode = product.code ?? "" !== "";
		const hasPrice = product.price >= 0;
		const hasStock = product.stock > 0;
		const hasCategory = product.category ?? "" !== "";
		console.log(product.category);

		if (
			!(
				hasTitle &&
				hasDescription &&
				hasCode &&
				hasPrice &&
				hasStock &&
				hasCategory
			)
		) {
			return {
				status: false,
				response: {
					message: "Invalid product!",
					detail: {
						hasTitle,
						hasDescription,
						hasCode,
						hasPrice,
						hasStock,
						hasCategory,
					},
				},
			};
		} else {
			return {
				status: true,
			};
		}
	};

	getProducts = async () => {
		if (!fs.existsSync(this.path)) return [];
		try {
			const data = await this.#readFile(this.path);
			// const data = await fs.promises.readFile(this.path, "utf-8");
			const result = JSON.parse(data);
			return result;
		} catch (error) {
			console.log(`Error reading file. ${error}`);
			return [];
		}
	};

	addProduct = async (newProduct) => {
		// check if it is a valid product
		const isValidProduct = this.#isValidProduct(newProduct);
		if (!isValidProduct.status)
			return {
				status: "Rejected",
				result: isValidProduct.response,
			};

		newProduct.status = newProduct.stock > 0;
		const products = await this.getProducts();
		const productIndex = products.findIndex(
			(product) => product.code === newProduct.code
		);

		if (productIndex === -1) {
			if (products.length === 0) {
				newProduct.id = 1;
			} else {
				newProduct.id = products[products.length - 1].id + 1;
			}
			products.push(newProduct);
		} else {
			const message = "Product already exist! You may update it.";
			console.log(message);
			return { status: "Rejected", message };
		}

		await this.#writeFile(products);
		return { status: "Added", newProduct };
	};

	getProductById = async (productId) => {
		if (fs.existsSync(this.path)) {
			const data = await this.#readFile(this.path);
			const json = JSON.parse(data);
			const productIndex = json.findIndex(
				(product) => product.id === productId
			);

			if (productIndex === -1) {
				const message = "Product missing!";
				console.error(message);
				return { status: "Rejected", message };
			} else {
				const result = json[productIndex];
				return { status: "Success", result };
			}
		} else {
			return { status: "Empty", result: [] };
		}
	};

	updateProduct = async (productId, newProperties) => {
		const product = await this.getProductById(productId);
		const products = await this.getProducts();
		if (product.status === "Rejected") {
			return product;
		} else {
			const updatedProduct = {
				...product.result,
				...newProperties,
			};
			updatedProduct.id = productId;
			updatedProduct.status = updatedProduct.stock > 0;
			const productIndex = products.findIndex(
				(product) => product.id === productId
			);
			products[productIndex] = updatedProduct;
			await this.#writeFile(products);
			console.log("Product updated!");
			return { status: "Updated", updatedProduct };
		}
	};

	deleteProduct = async (productId) => {
		const product = await this.getProductById(productId);
		if (product.status === "Rejected") {
			return product;
		} else {
			const products = await this.getProducts();
			const newProducts = products.filter(
				(element) => element.id !== productId
			);
			await this.#writeFile(newProducts);

			if (products.length - newProducts.length > 0) {
				const message = "Product deleted!";
				console.log(message);
				return { status: "Success", message };
			}
		}
	};
}
