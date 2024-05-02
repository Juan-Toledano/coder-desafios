import { request, response } from "express";
import { cartmodelo } from "../models/cartsMod.js";


export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params
        const carrito = await cartmodelo.findById(cid)

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
        const carrito = await cartmodelo.create({})
        return res.json({ msg: `carrito creado`, carrito })
    } catch (error) {
        console.log("error en el createCart", error);
        return res.status(500).json({ msg: "hablar con un admininstrador" })
    }
}

export const addProd_to_Cart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params

        const carrito = await cartmodelo.findById(cid)

        if (!carrito) {
            return res.status(404).json({ msg: `el carrito con id ${cid} no existe` })
        }

        const productoInCart = carrito.products.find(p => p.id.toString() == pid)

        if (productoInCart)
            productoInCart.quantity++
        else
            carrito.products.push({ id: pid, quantity: 1 })

        carrito.save()

        return res.json({msg: `carrito actualizado` , carrito})
    } catch (error) {
        console.log("error en el addProd_to_Cart", error);
        return res.status(500).json({ msg: "hablar con un admininstrador" })
    }
}
