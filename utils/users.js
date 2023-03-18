import { db } from "../db.js";
import { hashString } from "./bcrypt.js";

/**
 * Retrieves all users objects with the given field and value from the database.
 *
 * @async
 * @function selectUserByCustomField
 * @param {string} field - The field to be queried.
 * @param {string} value - The value to be queried.
 * @returns {Object | null} - The user object with the given email address, or null if not found.
 *
 * @throws {Error} - If there is an error executing the database query.
 */
const selectUserByCustomField = async (field, value) => {
    try {
        const q = `select * from users where ${field}=?`;
        const [rows, fields] = await db.query(q, [value]);
        if (rows.length) {
            return rows[0];
        }

        return null;
    } catch (err) {
        throw new Error(`Error retreiving user: ${err.message}`);
    }
}

/**
 * Retrieves the user object with the given email address from the database.
 *
 * @async
 * @function getUserByEmail
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Object | null} - The user object with the given email address, or null if not found.
 *
 * @throws {Error} - If there is an error executing the database query.
 */
const getUserByEmail = async (email) => {
    try {
        const q = `select * from users where email=?`;
        const values = req.body.email;
        const [rows, fields] = await db.query(q, [values]);
        if (rows.length) {
            return rows[0];
        }

        return null;
    } catch (err) {
        throw new Error(`Error retreiving user by email: ${err.message}`);
    }
}

/**
 * Retrieves the user object with the given email address and a username from the database.
 * 
 * @async
 * @function getUserByEmailAndUsername
 * @param {string} email 
 * @param {string} username 
 * @returns {Object | null}
 * 
 * @throws {Error}
 */
const getUserByEmailAndUsername = async (email, username) => {
    try {
        const q = 'select * from users where email=? or username=?';
        const [rows, fields] = await db.query(q, [email, username]);
        if (rows.length) {
            return rows[0];
        }

        return null;
    } catch (err) {
        throw new Error(`Error retreiving user by email and username: ${err.message}`);
    }
}

/**
 * Insert a user object to DB
 * 
 * @async
 * @function insertUser
 * @param {Object} user
 * @returns {number | null}
 * @throws {Error}
 */
const insertUser = async (user) => {
    if (!user.email || !user.password || !user.username) {
        return null;
    }
    try {
        const hashedPassword = await hashString(user.password);
        const q = 'insert into users (username, email, password) values (?, ?, ?)';
        const valuesArray = [
            user.username,
            user.email,
            hashedPassword,
        ];

        const [rows, fields] = await db.query(q, valuesArray);
        if (rows.insertId) {
            return rows.insertId;
        }

        return false;
    } catch (err) {
        throw new Error(`Error inserting user to DB: ${err.message}`);
    }
}

export {
    selectUserByCustomField,
    getUserByEmail,
    getUserByEmailAndUsername,
    insertUser
}