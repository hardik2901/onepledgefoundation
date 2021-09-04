import mongoose from 'mongoose'

const companyPageCardsSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
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

const companyPageCard = mongoose.model('companyPageCard', companyPageCardsSchema)

export default companyPageCard