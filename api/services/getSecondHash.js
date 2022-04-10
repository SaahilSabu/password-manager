const CryptoJS = require("crypto-js");

module.exports = function (firstHash, salt) {
  const hash = CryptoJS.PBKDF2(firstHash, salt, {
    //HASHED PWD
    keySize: 256 / 32,
  });
  return hash;
};
