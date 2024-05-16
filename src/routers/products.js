import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";
import { auth } from "../middleware/auth.js";

const router = Router()

router.get("/", getProducts);
router.get("/:pid", getProductById)
router.post("/", auth, addProduct)
router.put("/:pid", updateProduct)
router.delete("/:pid", deleteProduct)


export default router;