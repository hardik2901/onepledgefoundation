import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const companyPageSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    navBarTitle: {
        type: String,
        default: "",
    },
    ckeditor: [
        {
            title: String,
            rawHtml: String
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSubAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }
);

companyPageSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

companyPageSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const companyPage = mongoose.model('companyPage', companyPageSchema)

export default companyPage