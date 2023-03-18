import express from 'express';
import { getUserByEmail, health } from '../controllers/users.js';

const router = express.Router();

router.get("/health", health);

router.post('/email', getUserByEmail);

export default router;