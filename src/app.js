import express from "express"
import products from "./routers/products.js"
import carts from "./routers/carts.js"
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import views from "./routers/views.js"
import __dirname from "./utils.js"
import ProductManager from "./ProductManager.js";

const app = express();

const PORT = 3000

const p = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))


app.engine("handlebars" , engine())
app.set("views" , __dirname + "/views")
app.set("view engine" , "handlebars")



//app.get("/" , (req , res) =>{    
//    
//    return res.render("home")
//})

app.use("/" , views)
app.use("/api/products" , products);
app.use("/api/carts" , carts);


const serverHTTP= app.listen(PORT, ()=>console.log(`Server online en puerto ${PORT}`))
const serverSocket = new Server(serverHTTP)

serverSocket.on("connection" , socket =>{
    //console.log("cliente conectado desde el front-end");
    
    p.addProduct("samsung" , "a03" , 100000 ,  "xxx" , "30" , "celulares" , true);
    p.addProduct("iphone" , "14" , 900000  ,  "xxxx" , "10" , "celulares" , true);
    p.addProduct("motorola" , "e22" , 50000  ,  "xxxxx" , "15" , "celulares" , true);

    const products = p.getProducts()
    socket.emit("productos" , products)

    socket.on("agregarProducto" , producto=>{
        console.log({producto});
        const result = p.addProduct({...producto})
        console.log({result});
        if(result.producto)
        socket.emit("productos" , result.producto)
    })
})
