import { cartmodelo } from "./models/cartsMod.js"



export class CartManager{
    async getAll(){
        return cartmodelo.find().lean()
    }

    async getOneBy(filtro={}){
        return await cartmodelo.findOne(filtro).lean()
    }

    async getOneByPopulate(filtro={}){
        return await cartmodelo.findOne(filtro).populate("productos.producto").lean()
    }

    async create(){
        let carrito=await cartmodelo.create({productos:[]})
        return carrito.toJSON()
    }

    async update(id, carrito){
        return await cartmodelo.updateOne({_id:id}, carrito)
    }
}