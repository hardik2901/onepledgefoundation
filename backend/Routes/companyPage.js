import express from 'express'
import upload from '../Middleware/upload.js'

import {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompany
}
    from '../Controllers/companyPage.js'

import { protect, admin, subAdmin } from '../Middleware/authentication.js';
const router = express.Router();

router.route('/').get(protect, admin, getAllCompanies).post(protect, admin, upload.single('pptWithDetails'), createCompany)
router.route('/:id').put(protect, admin, updateCompany).delete(protect, admin, deleteCompany).get(protect, getCompany)


export default router;