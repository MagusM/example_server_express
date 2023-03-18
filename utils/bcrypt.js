import bcrypt from "bcryptjs";
const SALT = 10;

/**
 * This function will hash a string parameter.
 * 
 * @function hashString
 * @async
 * @param {*} string 
 * @returns {string}
 */
const hashString = async (string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(string, salt);

    return hash;
}

/**
 * This function will compare hash to a string
 * 
 * @function compareHash
 * @async
 * @param {string} hash 
 * @param {string} compare 
 * @returns {boolean}
 */
const compareHash = async (hash, compare) => {
    return bcrypt.compareSync(compare, hash);
    
}

export {
    hashString,
    compareHash
}