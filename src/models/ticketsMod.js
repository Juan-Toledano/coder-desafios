import mongoose, { Schema } from "mongoose";

const ticketCollection = "tickets"
const ticketSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    purchase_dateTime: { type: Date, default: Date.now },
    amount: Number,
    purchaser:String,
},
    {
        timestamps: true
    }
)

export const ticketModelo = mongoose.model(
    ticketCollection,
    ticketSchema
)