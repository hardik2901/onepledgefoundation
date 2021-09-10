import express from 'express'
import {
    createHomepageCard,
    updateHomePageCard,
    deleteHomepageCard,
    getAllHomepageCards,
    getAHomepageCard
} from '../Controllers/homePage.js';
const router = express.Router();
import upload from '../Middleware/upload.js';
import { protect, admin } from '../Middleware/authentication.js';

router.route("/").post(upload.single('coverPhoto'), createHomepageCard).get(getAllHomepageCards);
router.route("/:id").put(protect, admin, updateHomePageCard).delete(protect, admin, deleteHomepageCard).get(getAHomepageCard)

export default router;