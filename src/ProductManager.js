
import fs from "fs"
class ProductManager{
    #products
    #path
    static id_products = 0;
    constructor(){
        this.#products = this.#lecturaProductos();
        this.#path = "./data/productos.json" 
    }

    #asignarId(){
        let id = 1;
        if (this.#products.length != 0){
            id = this.#products[this.#products.length - 1].id + 1;
        }
        return id;      
    }

    #lecturaProductos(){
        try {
            if(fs.existsSync(this.path))
                return JSON.parse(fs.readFileSync(this.#path , {encoding: "utf-8"}));
            
            return []
        } catch (error) {
            console.log("hubo un error en la lectura del archivo");
        }
    }
    
    #guardarArchivo(){
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            console.log("archivo guardado correctamente");
        } catch (error) {
            console.log(`hubo un error al guardar el archivo ${error}`);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock , category , status = true){
        if(!title || !description || !price || !code || !stock || !category || !status)
            console.log("se necesitan que esten completos los siguientes parametros: title, description, price, code, stock, category y status");
                       
        const code2 = this.#products.find(p=> p.code == code);

        if(code2)
            return "esta repetido el código"
            
            ProductManager.id_products = ProductManager.id_products + 1
            const id = this.#asignarId()
            
            const Producto_nuevo = {
                id :id,
                title:title,
                description:description,
                price:price,
                thumbnail:thumbnail,
                code:code,
                stock:stock,
                category:category,
                status:status
            };
            this.#products.push(Producto_nuevo);
            this.#guardarArchivo();

            let result = {
                msg:"producto añadido correctamente",
                producto:Producto_nuevo
            }
            return result 
    }

    getProducts(limit = 0){
        limit = Number(limit);
        if (limit > 0){
            return this.#products.slice(0 , limit)
        }
        return this.#products;
    }
    getProductById(id){
        let estado = false
        let respuesta = `no existe ningun producto con el siguiente id: ${id}` 
        
        const product = this.#products.find(p => p.id == id);
        if(product){
            estado = true 
            respuesta = product
        }
        return {estado, respuesta}
    }
    updateProduct(id , objetoUpdate){
        let result = `el producto con el id ${id} no existe`

        const index = this.#products.findIndex(p=> p.id === id)

        if(index !== -1){
            const {id, ...rest} = objetoUpdate
            const permitidos = [title, description, price, thumbnail, code, stock , category]
            const actualizados = Object.keys(rest)
                .filter(propiedad => permitidos.includes(propiedad))
                .reduce((obj, key) =>{
                    obj[key] = rest[key]
                    return obj
                }, {})
            this.#products[index] = {...this.#products[index] , ...rest};
            this.#guardarArchivo();
            result = {
                msg: "el producto fue actualizado",
                producto:this.#products[index]
            }
        }
        return result
    }
    deleteProduct(id){
        let result = `el producto con id ${id} no existe`

        const index = this.#products.findIndex(p => p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p=> p.id !== id);
            this.#guardarArchivo();
            result ={
                msg:"el producto fue eliminado",
                resultado:this.#products[index]
  
            } 
        }
        return result;
    }
}
export default ProductManager;