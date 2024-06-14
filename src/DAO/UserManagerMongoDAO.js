import { usuariosModelo } from "../models/usuarioMod.js";

export class UserManagerMongoDAO {
    async create(user) {
      return await usuariosModelo.create(user);
    }
  
    async getBy(filter) {
      return await usuariosModelo.findOne(filter).lean();
    }
   
    async getByPopulate(filtro={}){
      return await usuariosModelo.findOne(filtro).populate("carrito").lean()
  }
  }