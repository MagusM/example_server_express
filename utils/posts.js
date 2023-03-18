import { db } from "../db.js";

/**
 * This will retuen a post by ID
 * 
 * @function getPostById
 * @async
 * @param {number | string} postId 
 * @returns {Object}
 * 
 * @throws {Error}
 */
const getPostById = async (postId) => {
    try {
        const q = 'select * from posts where id=?';
        const [rows, fields] = await db.query(q, [postId]);
        if (rows.length) {
            return rows[0];
        }

        return null;
    } catch (err) {
        throw new Error(`failed retreiving post: ${err.message}`);
    }
}

/**
 * Retrieves all posts objects with the given field and value from the database.
 *
 * @async
 * @function getAllPosts
 * @param {string} field - The field to be queried.
 * @param {string} value - The value to be queried.
 * @returns {Object | null} - The user object with the given email address, or null if not found.
 *
 * @throws {Error} - If there is an error executing the database query.
 */
const getAllPosts = async (field, value) => {
    try {
        let q;
        if (field && value) {
            q = `select * from posts where ${field} = ?`;
        } else {
            q = `select * from posts`;
        }
        const [rows, fields] = await db.query(q, [value]);
        if (rows.length) {
            return rows;
        }

        return null;
    } catch (err) {
        throw new Error(`failed retreiving posts: ${err.message}`);
    }
}

/**
 * This will create a new post record in posts table.
 * 
 * @function addPost
 * @async
 * @param {Object} post 
 * @returns {number | null}
 * 
 * @throws {Error}
 */
const addPost = async (post) => {
    try {
        const q = 'INSERT INTO `posts` (`title`, `desc`, `img`, `uid`) VALUES (?, ?, ?, ?)';
        const valuesArray = [post.title, post.desc, post.img, post.uid];

        const [rows, fields] = await db.query(q, valuesArray);
        if (rows.insertId) {
            return rows.insertId;
        }

        return false;
    } catch (err) {
        throw new Error(`Error inserting post to DB: ${err.message}`);
    }
}

/**
 * This will delete a post by ID
 * 
 * @function deletePost
 * @async
 * @param {string | number} id 
 * @returns {Object}
 * 
 * @throws {Error}
 */
const deletePost = async (id) => {
    try {
        const q = 'delete from `posts` where `id`=?';
        const [rows, fields] = await db.query(q, [id]);
        
        return rows.affectedRows > 0;
    } catch (err) {
        throw new Error(`failed deleting post: ${err.message}`);
    }
}

/**
 * This will delete all posts by user ID
 * 
 * @function deletePost
 * @async
 * @param {string | number} id 
 * @returns {Object}
 * 
 * @throws {Error}
 */
const deleteAllPostsByUserId = async (uid) => {
    try {
        const q = 'delete from posts where uid=?';
        const [rows, fields] = await db.query(q, [uid]);
        //todo: print fields
        console.log('fields', fields);
        if (fields) {
            return fields;
        }

        return false;
    } catch (err) {
        throw new Error(`failed deleting posts: ${err.message}`);
    }
}

const updatePost = async (id, post) => {
    try {
        let setStr = Object.keys(post).join('`=?, `') + '`=?';
        const valueArr = Object.values(post);
        valueArr.push(id);
        const q = "update `posts` set `" + setStr + " where `id`=?";
        console.log(q);
        const [rows, fields] = await db.query(q, valueArr);
        
        return rows.affectedRows > 0;
    } catch (err) {
        throw new Error(`failed updating post: ${err.message}`);
    }
}

export {
    getPostById,
    getAllPosts,
    addPost,
    deletePost,
    deleteAllPostsByUserId,
    updatePost
}

