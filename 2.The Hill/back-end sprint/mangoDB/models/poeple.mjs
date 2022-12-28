import mongoose from "mongoose"

const poepleSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
})

const Poeple = mongoose.model("poeple", poepleSchema)

export default Poeple