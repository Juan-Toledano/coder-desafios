import mongoose from 'mongoose'

export const usuariosModelo = mongoose.model("usuarios", new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    carrito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    rol: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
}))