import { Router } from "express";
import { getCartById, createCart, addProd_to_Cart, deleteProdinCart, updateProdinCart, deleteCart } from "../controllers/carts.js";
import { auth } from "../middleware/auth.js";

const router = Router()


router.get("/:cid", getCartById)
router.get("/" , createCart)
router.post("/", createCart)
router.post("/:cid/product/:pid", auth, addProd_to_Cart)
router.delete("/:cid/product/:pid", deleteProdinCart)
router.put("/:cid/product/:pid", updateProdinCart)
router.delete("/:cid", deleteCart)
export default router;