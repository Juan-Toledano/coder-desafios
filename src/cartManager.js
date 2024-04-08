import fs from "fs"
import { pid } from "process";
import ProductManager from "./ProductManager.js";

class CartsManager{
    #carts
    #path
    static id_products = 0;
    constructor(){
        this.#carts = this.#lecturaCarritos();
        this.#path = "./data/carritos.json" 
    }

    #asignarIdCarritos(){
        let id = 1;
        if (this.#carts.length != 0){
            id = this.#carts[this.#carts.length - 1].id + 1;
        }
        return id;      
    }

    #lecturaCarritos(){
        try {
            if(fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path , {encoding: "utf-8"}));
            
            return []
        } catch (error) {
            console.log("hubo un error en la lectura del archivo");
        }
    }
    
    #guardarArchivo(){
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
            console.log("archivo guardado correctamente");
        } catch (error) {
            console.log(`hubo un error al guardar el archivo ${error}`);
        }
    }

    crearCarrito(){
        const nuevoC={
            id: this.#asignarIdCarritos(),
            product:[]
        }

        this.#carts.push(nuevoC)
        this.#guardarArchivo();

        return nuevoC
    }

    getCarts(){
        return this.#carts
    }

    getProductById(id){
       const product = this.#carts.find(p => p.id == id);
        if(product){
            return "found"
        }
        else{
            return "not found"
        }
    }
    updateProduct(id , objetoUpdate){
        let result = `el producto con el id ${id} no existe`

        const index = this.#carts.findIndex(p=> p.id === id)

        if(index !== -1){
            const {id, ...rest} = objetoUpdate
            const permitidos = [title, description, price, thumbnail, code, stock , category]
            const actualizados = Object.keys(rest)
                .filter(propiedad => permitidos.includes(propiedad))
                .reduce((obj, key) =>{
                    obj[key] = rest[key]
                    return obj
                }, {})
            this.#carts[index] = {...this.#carts[index] , ...rest};
            this.#guardarArchivo();
            result = {
                msg: "el producto fue actualizado",
                producto:this.#carts[index]
            }
        }
        return result
    }
    deleteProduct(id){
        let result = `el producto con id ${id} no existe`

        const index = this.#carts.findIndex(p => p.id === id);
        if(index !== -1){
            this.#carts = this.#carts.filter(p=> p.id !== id);
            this.#guardarArchivo();
            result ={
                msg:"el producto fue eliminado",
                resultado:this.#carts[index]
  
            } 
        }
        return result;
    }

    addProd_to_Cart(id, cid){
        let result = `el carrito con id ${cid} no existe`

        const indexCart = this.#carts.findIndex(c=> c.id === cid);

        if(indexCart !== -1){
            const IndexProdCart = this.#carts[indexCart].products.findIndex(p=>p.id === pid)
            const p = new ProductManager()
            const prod = p.getProductById(pid)

            if(prod.estado && IndexProdCart === -1) {
                 this.#carts[indexCart].products.push({id: pid , "quantity" : 1})
                 this.#guardarArchivo()
                 result = "se agrego un producto al carrito"
            }else if(prod.estado && IndexProdCart !== -1){
                ++this.#carts[indexCart].products[IndexProdCart].quantity
                this.#guardarArchivo();
                result = "producto agregado al carrito";
            }else{
                result = `no existe producto con id ${pid}`
            }
        }
        return result
    }

}
export default CartsManager;