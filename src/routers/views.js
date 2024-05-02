import { Router } from "express"
import ProductManager from "../ProductManager.js"
import { productmodelo } from "../models/productsMod.js";

const router = Router();

router.get("/", async (req, res) => {
    const productos = await productmodelo.find().lean()
    return res.render("home", { productos, styles: "styles.css", title: "Home Page" })
})


router.get("/realtimeproducts", (req, res) => {
    return res.render("realTimeProducts", { title: "realTimeProducts" })
})


router.get("/chat", (req, res) => {
    return res.render("chat", { title: "Chat" })
})

export default router