import { Router } from "express";
import { getCartById , createCart , addProd_to_Cart } from "../controllers/carts.js";

const router = Router()


router.get("/:cid" , getCartById)
router.post("/" , createCart)
router.post("/:cid/product/:pid" , addProd_to_Cart)

export default router;