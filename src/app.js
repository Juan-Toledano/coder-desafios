import express from "express"
import products from "./routers/products.js"
import carts from "./routers/carts.js"
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import views from "./routers/views.js"
import __dirname from "./utils.js"
import { dbConnect } from "./db/config.js";
import { messagesmodelo } from "./models/messagesMod.js";
import { getProductsService } from "./services/products.services.js";
import session from "express-session";
import { router as sessionsRouter } from "./routers/session.js";
import MongoStore from "connect-mongo"
import { initPassport } from "./config/passport.config.js";
import passport from "passport";

const app = express();

const PORT = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.use(session({
    secret: "CoderCoder123",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        ttl:3600,
        mongoUrl:"mongodb+srv://juancruztoledano:juan1606@cluster0.mptb6ey.mongodb.net/ecommerce"
    }),
    
}))
initPassport()
app.use(passport.initialize())
app.use(passport.session())


app.engine("handlebars", engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use("/api/sessions", sessionsRouter)
app.use("/", views)
app.use("/api/products", products);
app.use("/api/carts", carts);

await dbConnect();

const serverHTTP = app.listen(PORT, () => console.log(`Server online en puerto ${PORT}`))
const serverSocket = new Server(serverHTTP)

serverSocket.on("connection", async (socket) => {

    //productos
    const { payload } = await getProductsService({})
    const productos = payload
    socket.emit("productos", payload)

    socket.on("agregarProducto", async (producto) => {
        //const newProduct = await productmodelo.create({ ...producto })
        const newProduct = await addProductService({ ...producto })
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
