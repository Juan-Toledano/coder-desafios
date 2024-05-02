import { request, response } from "express"
import { productmodelo } from "../models/productsMod.js"

export const getProducts = async (req = request, res = response) => {

    try {

        const { limit } = req.query
        const productos = await productmodelo.find().limit(Number(limit))
        return res.json({ productos });
    } catch (error) {
        console.log(`error en el getProducts ${error}`);
        return res.status(500).json({ msg: "hablar con un administrador" })
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const pid = req.params
        const producto = await productmodelo.findById(pid)
        if (!producto) {
            return res.status(404).json({ msg: `no existe producto con el id ${pid}` })
        }
        return res.json({ producto })
    } catch (error) {
        console.log(`error en el getProducts ${error}`);
        return res.status(500).json({ msg: "hablar con un administrador" })
    }
}

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, description, code, price, thumbnails, stock, category, status } = req.body

        if (!title, !description, !code, !price, !stock, !category, !status) {
            return res.status(404).json({ msg: `los campos title , description , code , price, thumbnails , stock, category, status son obligatorios` })
        }
        const producto = await productmodelo.create({title, description, code, price, thumbnails, stock, category, status})
        return res.json(producto)

    } catch (error) {
        console.log(`error en el addProducts ${error}`);
        return res.status(500).json({ msg: "hablar con un administrador" })
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const result = await productmodelo.findByIdAndDelete(pid)

        if (result)
            return res.json({ msg: "producto eliminado", result })
        return res.status(404).json({ msg: `no se pudo eliminar el producto con el id ${pid}` })
    } catch (error) {
        console.log(`error en el deleteProduct ${error}`);
        return res.status(500).json({ msg: "hablar con un administrador" })
    }

}

export const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const { _id, ...rest } = req.body
        const producto = await productmodelo.findByIdAndUpdate(pid, { ...rest }, { new: true })

        if (producto)
            return res.json({ msg: "producto acualizado", producto })
        return res.status(404).json({ msg: `no se pudo actualizar el producto con id ${pid}` })
    } catch (error) {
        console.log(`error en el updateProduct ${error}`);
        return res.status(500).json({ msg: "hablar con un administrador" })
    }
}