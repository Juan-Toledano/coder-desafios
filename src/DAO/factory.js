import { config } from "../config/config.js";
import { Singleton } from "./singleton.js";
import { CartManagerMongoDAO } from "./CartManagerMongoDao.js";


export let productDAO;
// export let cartDAO;
export let userDAO;
export let ticketDAO;

 export let cartDAO = new CartManagerMongoDAO()

switch (config.PERSISTENCE.toUpperCase()) {
  // case "FS":
  //   const { ProductManagerFileSystem } = await import("./ProductManagerFileSystem.js");
  //   productDAO = new ProductManagerFileSystem();
  //   const { CartManagerFileSystem } = await import("./CartManagerFileSystem.js");
  //   cartDAO = new CartManagerFileSystem();
  //   break;

  case "MONGO":
    await Singleton.connect(config.MONGO_URL, config.DB_NAME);

    const { ProductManagerMongoDAO } = await import("./ProductoManagerMongoDao.js");
    productDAO = new ProductManagerMongoDAO();

    // const { CartManagerMongoDAO } = await import("./CartManagerMongoDao.js");
    // cartDAO = new CartManagerMongoDAO();
    

    const { UserManagerMongoDAO } = await import("./UserManagerMongoDAO.js");
    userDAO = new UserManagerMongoDAO();

    const {ticketMongoDao} = await import ("./ticketsDao.js")
    ticketDAO = new ticketMongoDao

    break;

  default:
    throw new Error("Misconfigured persistence");
}

console.log({
  productDAO,
  cartDAO,
  userDAO,
  ticketDAO,
});
