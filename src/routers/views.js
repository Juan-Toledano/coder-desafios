import { Router } from "express"
import { getProductsService } from "../services/products.services.js";
import { getCartByIdService } from "../services/carts.services.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
    const { payload } = await getProductsService({})
    return res.render("home", { productos: payload, styles: "styles.css", title: "Home Page" })
})


router.get("/realtimeproducts", auth, (req, res) => {
    return res.render("realTimeProducts", { title: "realTimeProducts" })
})


router.get("/chat", (req, res) => {
    return res.render("chat", { title: "Chat" })
})

router.get("/products", auth, async (req, res) => {

    let carrito = {
        _id: req.session.usuario.carrito
    }
    const result = await getProductsService({ ...req.query })
    return res.render('products', { title: "productos", result })
})

router.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params
    console.log("id del carrito: ", cid);
    const carrito = await getCartByIdService(cid)
    return res.render("cart", { title: "carrito", carrito })
})

router.get('/', (req, res) => {

    res.status(200).render('home')
})

router.get('/registro', (req, res) => {
    let { error } = req.query

    res.status(200).render('registro', { error })
})

router.get('/login', (req, res) => {

    let { error } = req.query

    res.status(200).render('login', { error })
})

router.get('/perfil', auth, (req, res) => {

    res.status(200).render('perfil', {
        usuario: req.session.usuario, 
        login:req.session.usuario
    })
})


export default router