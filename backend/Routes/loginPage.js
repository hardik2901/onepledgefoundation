import express from 'express'
import login from '../Controllers/loginPage.js';

const router = express.Router();

router.route('/').post(login);

export default router


