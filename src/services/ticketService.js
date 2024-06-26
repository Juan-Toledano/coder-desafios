import { ticketDAO } from "../DAO/factory.js";
import { sendTicket } from "../config/mailingConfig.js";
import { cartService } from "./carts.services.js";
import { productService } from "./products.services.js";

export class TicketService {
  constructor(dao) {
    this.dao = dao; // No new, as dao is already instantiated
  }
  async getTotalPrice(cart) {
    return cart.reduce((accumulator, products) => {
      let productPrice = Number(products.product.price);
      let productQuantity = Number(products.quantity);
      return accumulator + productPrice * productQuantity;
    }, 0);
  }

  async validateStock(cart) {
    let userCart = await cartService.getCartById(cart);
    let productsWithStock = [];
    let productsWithoutStock = [];
    for (let cartProducts of userCart.products) {
      if (cartProducts.product.stock >= cartProducts.quantity) {
        let product = await productService.getProductsBy({
          _id: cartProducts.product._id,
        });
        product.stock = product.stock - cartProducts.quantity;
        await product.save();
        productsWithStock.push(cartProducts);
        await userCart.save();
      } else {
        productsWithoutStock.push(cartProducts);
      }
    }
    let total = await this.getTotalPrice(productsWithStock);
    return { productsWithStock, productsWithoutStock, total };
  }

  async createTicket(amount, purchaser) {
    return await this.dao.create(amount, purchaser);
  }

  async generateTicket(cart, purchaser) {
    let ticket;
    let cartItems = await this.validateStock(cart);
    if (cartItems.productsWithStock.length >= 1) {
      ticket = await this.createTicket(cartItems.total, purchaser);
      sendTicket(
        purchaser,
        ticket.code,
        cartItems.total,
        purchaser,
        ticket.purchase_datetime
      );
    }
    let newCart = await cartService.getCartById(cart);
    newCart.products = cartItems.productsWithoutStock;
    await newCart.save();
    return ticket;
  }
}

export const ticketService = new TicketService(ticketDAO);
