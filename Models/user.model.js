import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    userName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('users', userSchema)

export default User