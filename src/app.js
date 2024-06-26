import express from "express";
import path from "path";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import {router as viewsRouter} from "./routers/views.js";
import {router as productRouter} from "./routers/products.js";
import {router as cartRouter} from "./routers/carts.js";
import { router as sessionsRouter } from "./routers/session.js";
import sessions from "express-session";
import { messagesmodelo } from "./models/messagesMod.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import { config } from "./config/config.js";
import { initPassport } from "./config/passport.config.js";

const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  sessions({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      ttl: 3600,
      mongoUrl: config.MONGO_URL,
      dbName: config.DB_NAME,
    }),
  })
);

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () =>
  console.log(`Server listening in port:${PORT}`)
);

export const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("connectionServer", (connectionMessage) => {
    console.log(connectionMessage);
  });
  socket.on("id", async (userName) => {
    let messages = await messagesmodelo.find();
    socket.emit("previousMessages", messages);
    socket.broadcast.emit("newUser", userName);
  });
  socket.on("newMessage", async (userName, message) => {
    await messagesmodelo.create({ user: userName, message: message });
    io.emit("sendMessage", userName, message);
  });




  // import express from "express"
  // import products from "./routers/products.js"
  // import carts from "./routers/carts.js"
  // import { Server } from "socket.io";
  // import { engine } from "express-handlebars";
  // import views from "./routers/views.js"
  // import __dirname from "./utils.js"
  // import { dbConnect } from "./db/config.js";
  // import { messagesmodelo } from "./models/messagesMod.js";
  // import { getProductsService } from "./services/products.services.js";
  // import session from "express-session";
  // import { router as sessionsRouter } from "./routers/session.js";
  // import MongoStore from "connect-mongo"
  // import { initPassport } from "./config/passport.config.js";
  // import passport from "passport";
  
  // const app = express();
  
  // const PORT = 3000
  
  
  // app.use(express.json())
  // app.use(express.urlencoded({ extended: true }))
  // app.use(express.static(__dirname + "/public"))
  // app.use(session({
  //     secret: "CoderCoder123",
  //     resave: true,
  //     saveUninitialized: true,
  //     store: MongoStore.create({
  //         ttl:3600,
  //         mongoUrl:"mongodb+srv://juancruztoledano:juan1606@cluster0.mptb6ey.mongodb.net/ecommerce"
  //     }),
      
  // }))
  // initPassport()
  // app.use(passport.initialize())
  // app.use(passport.session())
  
  
  // app.engine("handlebars", engine())
  // app.set("views", __dirname + "/views")
  // app.set("view engine", "handlebars")
  
  // app.use("/api/sessions", sessionsRouter);
  // app.use("/", views)
  // app.use("/api/products", products);
  // app.use("/api/carts", carts);
  
  // await dbConnect();
  
  // const serverHTTP = app.listen(PORT, () => console.log(`Server online en puerto ${PORT}`))
  // const serverSocket = new Server(serverHTTP)
  
  // serverSocket.on("connection", async (socket) => {
  
  //     //productos
  //     const { payload } = await getProductsService({})
  //     const productos = payload
  //     socket.emit("productos", payload)
  
  //     socket.on("agregarProducto", async (producto) => {
  //         //const newProduct = await productmodelo.create({ ...producto })
  //         const newProduct = await addProductService({ ...producto })
  //         if (newProduct) {
  //             productos.push(newProduct)
  //             socket.emit("productos", productos)
  //         }
  //     })
  //     //chat
  //     const messages = await messagesmodelo.find()
  //     socket.emit("message", messages)
  
  //     socket.on("message", async (data) => {
  //         const newMessage = await messagesmodelo.create({ ...data })
  //         if (newMessage) {
  //             const messages = await messagesmodelo.find()
  //             serverSocket.emit("messageLogs", messages)
  //         }
  //     })
  
  //     socket.broadcast.emit("nuevo_user")
  // })
});