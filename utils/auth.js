import jwt from "jsonwebtoken";

const TOKEN_KEY = "blog_key"

/**
 * JWT sign function
 * 
 * @function signToken
 * @async
 * @param {Object} signObject 
 * @param {string | number} expiresIn 
 * @returns {string | Object}
 */
const signToken = async (signObject, expiresIn='1h') => {
    const token = jwt.sign(
        signObject, 
        TOKEN_KEY,
        {
            expiresIn: expiresIn
        }
    );

    return token;
}

/**
 * This will validate a token
 * 
 * @function verifyToken
 * @async
 * @param {string | Object} token 
 * @returns {boolean | null}
 * 
 * @throws {Error}
 */
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        if (!decoded) {
            return null;
        }

        return decoded;
    } catch (err) {
        throw new Error(`Failed verify token: ${err.message}`);
    }
}

export {
    TOKEN_KEY,
    signToken,
    verifyToken
}