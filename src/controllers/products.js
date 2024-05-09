import { request, response } from "express"
import { addProductService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from "../services/products.services.js"

export const getProducts = async (req = request, res = response) => {
    try {
        const result = await getProductsService({ ...req.query })
        return res.json({ result });
    } catch (error) {
        console.log(`error en el getProducts ${error}`);
        return res.status(500).json({ msg: "hablar con un administrador" })
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const pid = req.params
        const producto = await getProductByIdService(pid)
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

        const producto = await addProductService({ ...req.body })
        return res.json({ producto })

    } catch (error) {
        console.log(`error en el addProducts ${error}`);
        return res.status(500).json({ msg: "hablar con un administrador" })
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const result = await deleteProductService(pid)

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
        const producto = await updateProductService(pid, rest)
        if (producto)
            return res.json({ msg: "producto acualizado", producto })
        return res.status(404).json({ msg: `no se pudo actualizar el producto con id ${pid}` })
    } catch (error) {
        console.log(`error en el updateProduct ${error}`);
        return res.status(500).json({ msg: "hablar con un administrador" })
    }
}