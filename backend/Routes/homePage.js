import express from 'express'
import {
    createHomepageCard,
    updateHomePageCard,
    deleteHomepageCard,
    getAllHomepageCards,
    getAHomepageCard
} from '../Controllers/homePage.js';
const router = express.Router();

import { protect, admin } from '../Middleware/authentication.js';

router.route("/").post(protect, admin, createHomepageCard).get(getAllHomepageCards);
router.route("/:id").put(protect, admin, updateHomePageCard).delete(protect, admin, deleteHomepageCard).get(getAHomepageCard)

export default router;