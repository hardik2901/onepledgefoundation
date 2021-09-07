import express from 'express'
import companyPage from '../Models/companyPage.js'
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'

import { protect, admin } from '../Middleware/authentication.js';

const router = express.Router();

// API/LOGIN
// POST
// @Private <- Protected

router.post('/', asyncHandler(async (req, res) => {
    const { userName, password } = req.body;

    try {
        const company = await companyPage.findOne({ userName });
        if (company && (await bcrypt.compare(password, company.password))) {
            res.json({
                _id: company._id,
                name: company.userName,
                isAdmin: company.isAdmin,
                isSubAdmin: company.isSubAdmin,
                token: generateToken(company._id)
            })
        } else {
            res.status(401);
            res.json({
                message: "Invalid email or password"
            })
        }
    } catch (err) {
        res.status(401);
        res.json({
            message: "Invalid email or password"
        })
    }


}))

export default router


