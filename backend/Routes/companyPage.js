import express from 'express'

import {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    addEditor,
    getCompany,
    updateEditor,
    deleteEditor,
    getSingleEditor,
    getEditor
}
    from '../Controllers/companyPage.js'

import { protect, admin, subAdmin } from '../Middleware/authentication.js';
const router = express.Router();

router.route('/').get(protect, admin, getAllCompanies).post(protect, admin, createCompany)
router.route('/:id').put(protect, admin, updateCompany).delete(protect, admin, deleteCompany).get(getCompany)
router.route('/editor/:id').post(addEditor).put(updateEditor).delete(deleteEditor).get(protect, getEditor)
router.route('/editor/:id/:title').get(getSingleEditor)

export default router;