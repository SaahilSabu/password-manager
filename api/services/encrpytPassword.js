const CryptoJS = require("crypto-js");

module.exports = function (firstHash, key){
    const encryptedPassword = CryptoJS.AES.encrypt(
      //PWD STORED IN DB USING AES ENCRYPTION
      firstHash,
      key
    ).toString();

    return encryptedPassword;
}