import { verifyToken } from "../utils/auth.js";
import { 
    getAllPosts,
    deletePost as deletePostUtil,
    getPostById,
    addPost as addPostUtil,
    updatePost as updatePostUtil
} from "../utils/posts.js";
import { selectUserByCustomField } from "../utils/users.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();
        if (posts) {
            return res.json(posts);
        }

        return res.status(404).json('no posts found');
    } catch (err) {
        return res.status(500).json(`Failed fetching all posts: ${err.message}`);
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await getPostById(req.params.id);
        if (post) {
            return res.json(post);
        }

        return res.status(404).json('Post not found');
    } catch (err) {
        return res.status(500).json(`Failed get post by ID: ${err.message}`);
    }
}

export const addPost = async (req, res) => {
    if (!req.body.title || !req.body.desc || !req.body.uid) {
        return res.status(400).json('Missing params');
    }
    let user;
    try {
        user = await selectUserByCustomField('id', req.body.uid);
    } catch (err) {
        return res.send(500).json(`Error trying to fetch user: ${err.message}`);
    }
    if (!user) {
        return res.status(401).json(`User with ID: ${req.body.uid} not found`);
    }
    try {
        const post = {
            title: req.body.title,
            desc: req.body.desc,
            img: req.body.img ?? '',
            uid: req.body.uid
        }
        const id = await addPostUtil(post);
        if (id) {
            return res.json({id: id});
        }

        return res.status(500).json('Failed adding new post');
    } catch (err) {
        return res.status(500).json(`Failed insert post to db: ${err.message}`);
    }
}

export const deletePost = async (req, res) => {
    const token = req.cookies.access_token;
    let tokenVerified = false;
    if (!token) {
        return res.status(401).json("Not authenticated");
    }
    try {
        tokenVerified = verifyToken(token);
    } catch (err) {
        return res.status(500).json('Error verifying token');
    }
    try {
        if (tokenVerified) {
            const deleted = await deletePostUtil(req.params.id);
            if (deleted) {
                return res.json("Post deleted");
            }
            
            throw new Error('');
        } else {
            return res.json("Token is not valid");
        }
    } catch (err) {
        return res.status(500).json(`Error deleting post: ${err.message}`);
    }
}

export const updatePost = async (req, res) => {
    if (!req.params.id || !req.body.post) {
        return res.status(401).json('missing params');
    }
    try {
        const updated = await updatePostUtil(req.params.id, req.body.post);
        if (updated) {
            return res.status(200).json('update successful');
        }

        throw new Error('');
    } catch (err) {
        return res.status(500).json(`Error updating post: ${err.message}`);
    }
}

export const health = async (req, res) => {
    return res.json('posts route health ok!');
}