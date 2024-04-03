import { Router } from "express";
import ProductManager from "../ProductManager.js";



const router = Router()

router.get("/" , (req,res)=>{
    const {limit} = req.query;
    console.log({limit});
    const prod = new ProductManager();
    prod.addProduct("peugeot" , "308" , 900000 , "foto" , "xxx" , 30);
    prod.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxx" , 70)
    prod.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxxx" , 70);
    
    
    res.json({productos: prod.getProducts(limit)})

})

router.get("/:pid" , (req, res) => {

    const { pid } = req.params;
    const p = new ProductManager();
    const producto = p.getProductById(Number(pid));
    return res.json({producto});
})
router.post("/" , (req ,res)=>{
    const {title , description , code , price, thumbnails , stock, category, status} = req.body
    const prod = new ProductManager();
    prod.addProduct("peugeot" , "308" , 900000 , "foto" , "xxx" , 30)
    prod.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxx" , 70)
    
    const resultado = prod.addProduct(title , description , code , price, thumbnails , stock, category, status);

    return res.json({resultado});
})

router.put("/:pid" , (req , res) => {
    const {pid} = req.params
    const prod = new ProductManager();
    prod.addProduct("peugeot" , "308" , 900000 , "foto" , "xxx" , 30)
    prod.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxx" , 70)
    const resultado = prod.updateProduct(Number({pid}) , req.body)
    return res.json({resultado})
})


router.delete("/:pid" , (req , res) => {
    const {pid} = req.params
    const prod = new ProductManager();
    prod.addProduct("peugeot" , "308" , 900000 , "foto" , "xxx" , 30)
    prod.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxx" , 70)
    const result = prod.deleteProduct(Number(pid))
    return res.json({result})
})
export default router;