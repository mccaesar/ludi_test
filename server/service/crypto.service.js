const crypto = require('crypto');
const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
export const cipher = (message) =>{
    message = message.toString();
    const cipherHash = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipherHash.update(message, "utf-8", "hex");
    encryptedData += cipherHash.final("hex");
    return encryptedData
}


export const decipher = (message) =>{
    message = message.toString();
    const decipherHash = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipherHash.update(message, "hex", "utf-8");
    decryptedData += decipherHash.final("utf8");
    return decryptedData
}

