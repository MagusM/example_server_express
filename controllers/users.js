import { db } from "../db.js";
import { hash } from "../utils/bcrypt.js";
import { 
    getUserByEmail as getUserByEmailUtil,
    getUserByEmailAndUsername as getUserByEmailAndUsernameUtil,
    insertUser as insertUserUtil
}  from "../utils/users.js";

/**
 * @async
 * @function getUserByEmail
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} - The user object with the given email address, or an error response if not found.
 * @throws {Error} - If there is an error executing the database query.
 */
export const getUserByEmail = async (req, res) => {
    try {
        const user = await getUserByEmailUtil(res.body.email);
        if (user) {
            return res.json(user);
        }

        return res.status(404).json('not found');
    } catch (err) {
        throw new Error(`Error retreiving user by email: ${err.message}`);
    }
}

/**
 * @async
 * @function getUserByEmailAndUsername
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 * @throws {Error}
 */
export const getUserByEmailAndUsername = async (req, res) => {
    console.log('getUserByEmailAndUsername', req.body);
    try {
        const user = getUserByEmailAndUsernameUtil(req.body.email, req.body.username);
        if (user) {
            return res.json(user);
        }

        return res.status(404).json('not found');
    } catch (err) {
        return res.status(500).json(`Error retreiving user by email and username: ${err.message}`);
    }
}

/**
 * @async
 * @function insertUser
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 * @throws {Error}
 */
export const insertUser = async (req, res) => {
    try {
        //todo: check return response from utils
        const res = insertUser({
            email: req.body.email,
            username: req.body.username,
            password: hash(req.body.password)
        });
        if (res === null) {
            return res.status(400).json('params missing');
        }
        if (user) {
            return res.status(200).json('ok');
        }

        return res.status(500).json('insert user failed');
    } catch (err) {
        return res.status(500).json('insert user failed');
    }
}