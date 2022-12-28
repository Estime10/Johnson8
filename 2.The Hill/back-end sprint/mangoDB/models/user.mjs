import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
   
})

const User = mongoose.model("User", UserSchema)


export default User
