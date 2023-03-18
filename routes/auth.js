import express from 'express';
import { login, logout, register, health } from '../controllers/auth.js';

const router = express.Router();

router.get('/health', health);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;