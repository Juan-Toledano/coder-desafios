//*app.js* 

import express from "express"
import http from "http"
import ProductManager from "./ProductManager.js"
import fs from "fs"
import { error } from "console";



const app = express();

const PORT = 3000


app.get("/" , (req , res) =>{    
    
    res.send("home page")
})

app.get("/products" , (req,res)=>{
    const {limit} = req.query;
    console.log({limit});
    const prod = new ProductManager();
    prod.addProduct("peugeot" , "308" , 900000 , "foto" , "xxx" , 30);
    prod.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxx" , 70)
    prod.addProduct("chevrolet" , "meriva" , 5000 , "foto" , "xxxxx" , 70);
    
    
    res.json({productos: prod.getProducts(limit)})

})

app.get("/products/:pid" , (req, res) => {
    //let id = req.params.id
    //console.log(id);
    //id = Number(id)
    //if(isNaN(id)){
    //    return res.json({erorr: `tine que ser un valor numerico`})
    //}
    const { pid } = req.params;
    const p = new ProductManager();
    const producto = p.getProductById(Number(pid));
    return res.json({producto});
})

app.listen(PORT, ()=>console.log(`Server online en puerto ${PORT}`))

