import mongoose from "mongoose"

const messagesCollection = "messages"
const messagesSchema = new mongoose.Schema(
    {
        user:{type:String , unique:true , required:true},
        message:{type:String , required:true}
    },
    {
        timestamps:true
    }
)

export const messagesmodelo = mongoose.model(
    messagesCollection,
    messagesSchema
)