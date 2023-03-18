import express from 'express';
import { 
    health, 
    addPost, 
    getPosts, 
    getPost, 
    deletePost, 
    updatePost 
} from '../controllers/posts.js';

const router = express.Router();

router.get("/health", health);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;