import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    fileFilter(req, file, cb) {
        var ext = path.extname(file.originalname);
        console.log(file.originalname);
        if (ext != '.jpg' && ext != '.jpeg' && ext != '.png' && ext != '.gif' && ext != '.pdf' && ext != '.ppt')
            cb(new Error('File format is not supported'))
        cb(null, true)

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// router.post('/', upload.array('upload', 10), async (req, res) => {
//     res.send(req.files);
// });

export default upload
