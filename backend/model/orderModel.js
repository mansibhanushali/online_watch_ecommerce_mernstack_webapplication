import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    items: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    amount: {
        type:Number,
        required: true
    },
    address: {
        type:Object,
        required: true
    },
    status: {
        type:String,
        required: true,
        default:'Order Placed'
    },
    paymentMethod: {
        type:String,
        required: true
    },
    payment: {
        type:Boolean,
        required: true,
        default:false
    },
    date: {
        type: Number,
        required:true
    }
},{timestamps:true}) 

const Order = mongoose.model('Order' , orderSchema)

export default Order