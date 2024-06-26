import { ticketModelo } from "../models/ticketsMod.js";

export class ticketMongoDao {
  async create(amount, purchaser) {
    let code = Math.floor(Math.random() * 9000000) + 1000000;
    let purchase_dateTime = new Date();
    return await ticketModelo.create({
      code,
      purchase_dateTime,
      amount,
      purchaser,
    });
  }
}
