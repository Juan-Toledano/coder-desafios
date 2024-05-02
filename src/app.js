import express from "express"
import products from "./routers/products.js"
import carts from "./routers/carts.js"
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import views from "./routers/views.js"
import __dirname from "./utils.js"
import ProductManager from "./ProductManager.js";
import { dbConnect } from "./db/config.js";
import { productmodelo } from "./models/productsMod.js";
import { messagesmodelo } from "./models/messagesMod.js";

const app = express();

const PORT = 3000

const p = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))


app.engine("handlebars", engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


app.use("/", views)
app.use("/api/products", products);
app.use("/api/carts", carts);

await dbConnect();

const serverHTTP = app.listen(PORT, () => console.log(`Server online en puerto ${PORT}`))
const serverSocket = new Server(serverHTTP)

serverSocket.on("connection", async (socket) => {

    //productos
    const productos = await productmodelo.find()
    socket.emit("productos", products)

    socket.on("agregarProducto", async producto => {
        const newProduct = await productmodelo.create({ ...producto })
        if (newProduct) {
            productos.push(newProduct)
            socket.emit("productos", productos)
        }
    })
    //chat
    const messages = await messagesmodelo.find()
    socket.emit("message", messages)

    socket.on("message", async (data) => {
        const newMessage = await messagesmodelo.create({ ...data })
        if (newMessage) {
            const messages = await messagesmodelo.find()
            serverSocket.emit("messageLogs", messages)
        }
    })

    socket.broadcast.emit("nuevo_user")
})
