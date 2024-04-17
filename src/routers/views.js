import {Router} from "express"
import ProductManager from "../ProductManager.js"

const router = Router();

router.get("/" , (req,res)=>{
    const p = new ProductManager()
    p.addProduct("samsung" , "a03" , 100000 ,"imagen" ,  "xxx" , "30" , "celulares" , true)
    p.addProduct("iphone" , "14" , 900000 , "imagen" ,  "xxxx" , "10" , "celulares" , true)
    p.addProduct("motorola" , "e22" , 50000 , "imagen" ,  "xxxxx" , "15" , "celulares" , true)
    const products = p.getProducts();
    console.log(products);
    return res.render("home" , {products , styles:"styles.css"})
})


router.get("/realtimeproducts" , (req , res) =>{
    const p = new ProductManager()
    p.addProduct("samsung" , "a03" , 100000 ,"imagen" ,  "xxx" , "30" , "celulares" , true)
    p.addProduct("iphone" , "14" , 900000 , "imagen" ,  "xxxx" , "10" , "celulares" , true)
    p.addProduct("motorola" , "e22" , 50000 , "imagen" ,  "xxxxx" , "15" , "celulares" , true)
    const products = p.getProducts()
    return res.render("realTimeProducts" , products)
})


export default router