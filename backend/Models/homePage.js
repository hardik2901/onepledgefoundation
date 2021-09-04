import mongoose from 'mongoose'

const homePageSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    coverPhoto: {
        type: String,
        default: "",
    },
    discription: {
        type: String,
        default: "",
    },
    Location: {
        type: String,
        default: "",
    },
}, { timestamps: true }
);

const homePage = mongoose.model('homePage', homePageSchema)

export default homePage