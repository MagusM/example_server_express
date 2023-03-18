import { compareHash } from "../utils/bcrypt.js";
import { getUserByEmailAndUsername, insertUser, selectUserByCustomField } from "../utils/users.js";
import { signToken } from "../utils/auth.js";

/**
 * Register function
 * 
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
            const insertRes = await insertUser({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
            if (!insertRes) {
                return res.status(500).json('create user failed');
            }
        }

        // todo: if register user - also login ?
        return res.json('register successful');
    } catch (err) {
        return res.status(500).json(`Failed regisering user: ${err.message}`);
    }

}

/**
 * Login function
 * 
 * @async
 * @function login
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 * @throws {Error}
 */
export const login = async (req, res) => {
    if (!req.body.username) {
        return res.status(400).json('missing params');
    }
    try {
        const user = await selectUserByCustomField('username', req.body.username);
        if (!user) {
            return res.status(404).json('user not found');
        }
        if (!(await compareHash(user.password, req.body.password))) {
            return res.status(403).json('wrong username or password');
        }

        const token = await signToken({id: user.id});
        const {password, ...leanUser} = user;
        return res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(leanUser);
    } catch (err) {
        return res.status(500).json(`Failed to login: ${err.message}`);
    }
}

/**
 * @async
 * @function logout
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 * @throws {Error}
 */
export const logout = (req, res) => {
    res.json('Logout');
}

/**
 * @async
 * @function check
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 */
export const health = (req, res) => {
    res.json("auth route health ok!");
}