import express from 'express';
import { getUserByEmail } from '../controllers/users.js';

const router = express.Router();

router.get("/health", (req, res) => {
    res.json("Users routes is up!");
});

router.post('/email', getUserByEmail);

export default router;