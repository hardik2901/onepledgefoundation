import jwt from 'jsonwebtoken'
import companyPage from '../Models/companyPage.js'

const protect = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            console.log('here')
            req.companyPage = await companyPage.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            res.json({
                "message": "Not authorized Forbidden"
            })
        }
    }

    if (!token) {
        res.status(401)
        res.json({
            "message": "Not authorized as admin"
        })
    }
}

const admin = (req, res, next) => {
    try {
        if (req.companyPage && req.companyPage.isAdmin) {
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Not authorized as admin"
            })
        }
    } catch (err) {
        res.status(err);
    }

}

const subAdmin = (req, res, next) => {
    try {
        if (req.companyPage && (req.companyPage.isSubAdmin || req.companyPage.isAdmin)) {
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Not authorized. Forbidden ..!"
            })
        }
    } catch (err) {
        res.status(err);
    }

}

export { protect, admin, subAdmin }
