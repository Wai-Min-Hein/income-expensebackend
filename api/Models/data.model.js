import mongoose, { Schema } from "mongoose";
const dataSchema = new Schema({
    userId : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    },
    time : {
        type: String,
        required: true
    },
    amount:{
        type:Number,
        required:true
    }
}, {timestamps: true})

const Datas = mongoose.model('datas', dataSchema)

export default Datas