import mongoose from "mongoose"

const postingMessage = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
},
cloudinary_id: {
    type: String,
},
  likes: {
    type: Array,
    default: '',
  },
},
  { timestamps: true }
);


const Post = mongoose.model("Post", postingMessage)
export default Post