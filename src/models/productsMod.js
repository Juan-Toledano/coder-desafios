import mongoose from "mongoose";

const productCollection = "product"
const productSchema = new mongoose.Schema(
    {
        title:{type:String , required:true},
        description:{type:String , required:true},
        price:{type:Number , required:true},
        thumnail:String,
        code:{type:String , required:true , unique:true},
        stock:{type:String , required:true},
        category:{type:String , required:true},    
        status:{type:Boolean , required:true}    
    },
    {
        timestamps:true
    }
)

export const productmodelo = mongoose.model(
    productCollection,
    productSchema
)