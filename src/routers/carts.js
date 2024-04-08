import { Router } from "express";
import CartsManager from "../cartManager.js";

const router = Router()

router.get("/:cid" , (req, res) =>{
    const {cid} = req.params
    const c = new CartsManager()
    const result = c.getProductById(Number(cid))
    return res.json({result})
})

router.get("/", (req, res) =>{
    const c = new CartsManager()
    const carts = c.crearCarrito()
    c.crearCarrito()
    c.crearCarrito()
    c.crearCarrito()
    return res.json({carritos: c.getCarts()})
})
router.post("/" , (req, res) =>{
    const c = new CartsManager()
    c.crearCarrito()
    c.crearCarrito()
    c.crearCarrito()
    const result = c.crearCarrito()    
    return res.json({result})
})



router.post("/:cid/product/:pid" , (req, res) =>{
    const {cid , pid} = req.params
    const c = new CartsManager()
    const result = c.addProd_to_Cart(Number(cid), Number(pid))
    return res.json({result})
})

export default router;