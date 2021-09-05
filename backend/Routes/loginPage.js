import express from 'express'
import companyPage from '../Models/companyPage.js'
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcrypt'

import { protect, admin } from '../Middleware/authentication.js';

const router = express.Router();

// API/LOGIN
// POST
// @Private <- Protected

router.post('/', async (req, res) => {
    console.log("here");
    const { userName, password } = req.body;
    console.log(req.body)

    try {
        const company = await companyPage.findOne({ userName });
        console.log(company);

        if (company && (await bcrypt.compare(password, company.password))) {
            res.json({
                _id: company._id,
                name: company.userName,
                isAdmin: company.isAdmin,
                token: generateToken(company._id)
            })
        } else {
            res.status(401);
            throw new Error('Invalid email or password')
        }
    } catch (err) {
        res.status(err);
    }


})

export default router


