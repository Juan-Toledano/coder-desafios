import express from "express"
import products from "./routers/products.js"
import carts from "./routers/carts.js"

const app = express();

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/" , (req , res) =>{    
    
    res.send("home page")
})

app.use("/api/products" , products);
app.use("/api/carts" , carts);


app.listen(PORT, ()=>console.log(`Server online en puerto ${PORT}`))