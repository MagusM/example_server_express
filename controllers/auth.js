import { hash } from "../utils/bcrypt.js";
import { getUserByEmailAndUsername, insertUser } from "../utils/users.js";

/**
 * @async
 * @function register
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 * @throws {Error}
 */
export const register = async (req, res) => {
    if (!req.body.email || !req.body.username || !req.body.password) {
        return res.status(400).json('missing params');
    }
    try {
        const user = await getUserByEmailAndUsername(req.body.email, req.body.username);
        if (!user) {
            const insertRes = insertUser({
                email: req.body.email,
                username: req.body.username,
                password: hash(req.body.password)
            });
            if (!insertRes) {
                return res.status(500).json('create user failed');
            }
        }

        // todo: if register user - also login ?
        return res.json('register complete');
    } catch (err) {
        return res.status(500).json('Failed regisering user');
    }

}

export const login = (req, res) => {
    res.json('register');
}

export const logout = (req, res) => {
    res.json('register');
}

export const check = (req, res) => {
    res.json("from check");
}