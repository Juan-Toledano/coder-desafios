import { request, response } from "express";
import { addProd_to_CartService, createCartService, deleteCartService, deleteProdinCartService, getCartByIdService, updateProdinCartService } from "../services/carts.services.js";


export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params
        //const carrito = await cartmodelo.findById(cid)
        const carrito = await getCartByIdService(cid)
        if (carrito) {
            return res.json({ carrito })
        } else {
            return res.status(404).json({ msg: `el carrito con id ${cid} no existe` })
        }

    } catch (error) {
        console.log("error en el getcartbyid", error);
        return res.status(500).json({ msg: "hablar con un admininstrador" })
    }
}

export const createCart = async (req = request, res = response) => {
    try {
        const carrito = await createCartService()
        return res.json({ msg: `carrito creado`, carrito })
    } catch (error) {
        console.log("error en el createCart", error);
        return res.status(500).json({ msg: "hablar con un admininstrador" })
    }
}

export const addProd_to_Cart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params
        const carrito = await addProd_to_CartService(cid, pid)

        if (!carrito) {
            return res.status(404).json({ msg: `el carrito con id ${cid} no existe` })
        }
        return res.json({ msg: `carrito actualizado`, carrito })
    } catch (error) {
        console.log("error en el addProd_to_Cart", error);
        return res.status(500).json({ msg: "hablar con un admininstrador" })
    }
}

export const deleteProdinCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params
        const carrito = await deleteProdinCartService(cid, pid)
        if (!carrito)
            return res.status(404).json({ msg: "no se pudo realizar la operacion" })
        return res.json({ msg: `producto eliminado del carrito ${carrito}` })
    } catch (error) {
        console.log("error en el deleteProdinCart", error);
        return res.status(500).json({ msg: "hablar con un admininstrador" })
    }
}

export const updateProdinCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body

        if (!quantity || !Number.isInteger(quantity))
            return res.status(404).json({ msg: "el quantity es obligatorio y debe ser un numero entero" })

        const carrito = await updateProdinCartService(cid, pid, quantity)


        if (!carrito)
            return res.status(404).json({ msg: "no se pudo realizar la operacion" })
        return res.json({ msg: "producto actualizado del carrito", carrito })
    } catch (error) {
        console.log("error en el updateProdinCart", error);
        return res.status(500).json({ msg: "hablar con un admininstrador" })
    }
}

export const deleteCart = async (req = request, res = response) => {
    try {
        const { cid } = req.params


        const carrito = await deleteCartService(cid)


        if (!carrito)
            return res.status(404).json({ msg: "no se pudo realizar la operacion" })
        return res.json({ msg: "producto actualizado del carrito", carrito })
    } catch (error) {
        console.log("error en el updateProdinCart", error);
        return res.status(500).json({ msg: "hablar con un admininstrador" })
    }
}