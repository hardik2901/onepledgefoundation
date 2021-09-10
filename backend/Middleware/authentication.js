import jwt from 'jsonwebtoken'
import companyPage from '../Models/companyPage.js'

const protect = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            console.log('here')
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const companyCheck = await companyPage.findById(decoded.id)
            console.log(companyCheck)
            if (decoded.id !== req.params.id && !(companyCheck.isAdmin || companyCheck.isSubAdmin)) {
                throw new Error
            }
            req.companyPage = await companyPage.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            res.json({
                "message": "Not authorized, token failed"
            })
        }
    }

    if (!token) {
        res.status(401)
        res.json({
            "message": "Not authorized, token failed"
        })
    }
}

const admin = (req, res, next) => {
    console.log('here')
    try {
        if (req.companyPage && req.companyPage.isAdmin) {
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Not authorized, token failed"
            })
        }
    } catch (err) {
        res.status(401)
        res.json({
            "message": "Not authorized, token failed"
        })
    }

}

const subAdmin = (req, res, next) => {
    console.log('here')
    try {
        if (req.companyPage && (req.companyPage.isSubAdmin || req.companyPage.isAdmin)) {
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Not authorized, token failed"
            })
        }
    } catch (err) {
        res.status(401)
        res.json({
            "message": "Not authorized, token failed"
        })
    }

}

export { protect, admin, subAdmin }
