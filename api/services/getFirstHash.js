const CryptoJS = require("crypto-js");

module.exports = function (masterPassword, salt){
    const hash = CryptoJS.PBKDF2(masterPassword, salt, {
    //HASHED PWD
    keySize: 256 / 32,
    iterations: 100100
  });
  return hash;
};