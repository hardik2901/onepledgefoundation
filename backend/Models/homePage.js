import mongoose from 'mongoose'

const homePageSchema = new mongoose.Schema({

    title: {
        type: String,
        default: "",
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