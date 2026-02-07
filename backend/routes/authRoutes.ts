import express from 'express';
import { googleLogin, logout, refresh, getProfile } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/google', googleLogin);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);

export default router;
