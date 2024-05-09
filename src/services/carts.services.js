import { cartmodelo } from "../models/cartsMod.js"


export const getCartByIdService = async (cid) => {
    try {
        return await cartmodelo.findById(cid).populate("products.id").lean()

    } catch (error) {
        console.log("error en el getCartByIdService", error);
        throw error
    }
}

export const createCartService = async () => {
    try {
        return await cartmodelo.create({})
    } catch (error) {
        console.log("error en el createCartService", error);
        throw error
    }
}

export const addProd_to_CartService = async (cid, pid) => {
    try {
        const carrito = await cartmodelo.findById(cid)

        if (!carrito) {
            return null
        }

        const productoInCart = carrito.products.find(p => p.id.toString() == pid)

        if (productoInCart)
            productoInCart.quantity++
        else
            carrito.products.push({ id: pid, quantity: 1 })

        carrito.save()

        return carrito
    } catch (error) {
        console.log("error en el addProd_to_CartService", error);
        throw error
    }
}

export const deleteProdinCartService = async (cid, pid) => {
    try {
        return await cartmodelo.findByIdAndUpdate(cid, { $pull: { "products": { id: pid } } }, { new: true })
    } catch (error) {
        console.log("error en el deleteProdinCartService", error);
        throw error
    }
}

export const updateProdinCartService = async (cid, pid , quantity) => {
    try {
        return await cartmodelo.findOneAndUpdate(
            { _id: cid, "products.id": pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        )
    } catch (error) {
        console.log("error en el updateProdinCartService", error);
        throw error
    }
}

export const deleteCartService = async (cid) => {
    try {
        return await cartmodelo.findByIdAndUpdate(cid, { $set: { 'products': [] } }, { new: true })
    } catch (error) {
        console.log("error en el deleteCartService", error);
        throw error
    }
}