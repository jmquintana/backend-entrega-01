import { Router } from "express";

const router = Router();

let carts = [];

router.get("/", (req, res) => {
	res.send({ status: "Success", payload: carts });
});

export default router;
