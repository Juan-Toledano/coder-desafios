import mongoose from 'mongoose'

export const usuariosModelo = mongoose.model("usuarios", new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    carrito: { type: mongoose.Types.ObjectId, ref: "cart" },
    rol: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
}))


// export const usuariosModelo=mongoose.model('usuarios',new mongoose.Schema({
//     nombre: String,
//     email:{
//         type: String, unique:true
//     }, 
//     password: String,
//     rol:{
//         type: String, 
//         enum:["user" , "admin"],
//         default:"user"
//     },
//     carrito:{
//         type:mongoose.Types.ObjectId, ref:"cart"
//     }
// },{timestamps:true , strict:false}))
