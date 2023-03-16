import bcrypt from "bcryptjs";
const SALT = 10;

const hash = async (string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(string, salt);

    return hash;
}

const compareHash = async (hash, compare) => {
    return bcrypt.compareSync(compare, hash);
    
}

export {
    hash,
    compareHash
}