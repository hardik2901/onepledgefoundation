import express from 'express'
import {
    createCompanyCard,
    updateCompanyCards,
    deleteCompanyCard,
    getAllCompanyCards,
    getCompanyCard
} from '../Controllers/companyPageCards.js'
import upload from '../Middleware/upload.js'
import { protect, admin, subAdmin } from '../Middleware/authentication.js';
const router = express.Router();


router.route("/:id").post(protect, subAdmin, upload.single('coverPhoto'), createCompanyCard)
router.route("/:compid/:cardId").put(protect, admin, upload.single('coverPhoto'), updateCompanyCards).delete(protect, admin, deleteCompanyCard).get(protect, admin, getCompanyCard)
router.route('/:id/cards').get(protect, getAllCompanyCards)

export default router;