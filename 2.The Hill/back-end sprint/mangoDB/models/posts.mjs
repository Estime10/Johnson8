import mongoose from "mongoose"

const postingMessage = new mongoose.Schema({
 
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
      type: String,
      required: true,
      },
})

const Post = mongoose.model("Post", postingMessage )
export default Post