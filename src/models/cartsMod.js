import mongoose, { Schema } from "mongoose"

const cartCollection = "cart"
const cartSchema = new mongoose.Schema(
    {
        products:[
            
            {
                _id:false,
                id:{
                    type: Schema.Types.ObjectId,
                    ref:"product"
                },
                quantity:{type:Number , required:true}
            }
        ]
    },
    {
        timestamps:true
    }
)

export const cartmodelo = mongoose.model(
    cartCollection,
    cartSchema
)