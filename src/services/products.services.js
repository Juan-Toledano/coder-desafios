import { productmodelo } from "../models/productsMod.js"


export const getProductsService = async ({ limit = 2, page = 1, sort, query }) => {

    try {
        page = page == 0 ? 1 : page
        page = Number(page)
        limit = Number(limit)
        const skip = (page - 1) * limit
        const sortOrderOptions = { 'asc': -1, 'desc': 1 }
        sort = sortOrderOptions[sort] || null

        try {
            if (query) {
                query = JSON.parse(decodeURIComponent(query))
            }
        } catch (error) {
            console.log(`error al parsear`, error);
            query = {}
        }

        const queryProdcuts = productmodelo.find(query).limit(limit).skip(skip).lean();
        if (sort !== null) {
            queryProdcuts.sort({ price: sort })
        }

        const [productos, totalDocs] = await Promise.all([queryProdcuts, productmodelo.countDocuments(query)])

        const totalPages = Math.ceil(totalDocs / limit)
        const hasNextPage = page < totalPages
        const hasPrevPage = page > 1
        const prevPage = hasPrevPage ? page - 1 : null
        const nextPage = hasNextPage ? page + 1 : null

        return {
            //status: "succes/error",
            totalDocs,
            totalPages,
            limit,
            query: JSON.stringify(query),
            page,
            hasNextPage,
            hasPrevPage,
            prevPage,
            nextPage,
            payload: productos
        }

    } catch (error) {
        console.log(`error en el getProducts ${error}`);
        throw error
    }
}

export const getProductByIdService = async (pid) => {
    try {
        return await productmodelo.findById(pid)
    } catch (error) {
        console.log(`error en el getProductsByIdService ${error}`);
        throw error
    }
}

export const addProductService = async ({ title, description, code, price, thumbnails, stock, category, status }) => {
    try {
        return await productmodelo.create({ title, description, code, price, thumbnails, stock, category, status })
    } catch (error) {
        console.log(`error en el addProductsServices ${error}`);
        throw error
    }
}

export const deleteProductService = async (pid) => {
    try {
        return await productmodelo.findByIdAndDelete(pid)
    } catch (error) {
        console.log(`error en el deleteProductServices ${error}`);
        throw error
    }

}

export const updateProductService = async (pid, rest) => {
    try {
        return await productmodelo.findByIdAndUpdate(pid, { ...rest }, { new: true })

    } catch (error) {
        console.log(`error en el updateProductService ${error}`);
        throw error
    }
}