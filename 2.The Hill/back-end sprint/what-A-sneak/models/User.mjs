import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
    },
    friends: {
        type: Array,
    },
    pendingFriends: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now
    },
    Post: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    like: {
        type: Array,
        default:0
        
    },
    dislike: {
        type: Array,
        default:0
       
    },
    comments: [
        {
            Post: {
                type: mongoose.Schema.ObjectId,
                required: true
            },
            Postname: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
})

const User = mongoose.model("User", UserSchema )
export default User