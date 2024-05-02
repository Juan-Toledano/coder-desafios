import mongoose from "mongoose";

export const dbConnect = async () =>{
    try {
        await mongoose.connect("mongodb+srv://juancruztoledano:juan1606@cluster0.mptb6ey.mongodb.net/ecommerce")
        console.log("la base de datos esta activa");
    } catch (error) {
        console.log(`error al conectar la base de datos ${error}`);
    }
}