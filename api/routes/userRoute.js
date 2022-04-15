const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const getFirstHash = require("../services/getFirstHash");
const getSecondHash = require("../services/getSecondHash");
const encryptPassword = require("../services/encrpytPassword");

//REGISTER

router.post("/register", async (req, res) => {
  var salt = req.body.username; //SALT
  var firstHash = getFirstHash(req.body.masterPassword, salt);
  var secondHash = getSecondHash(firstHash, salt);
  var key = CryptoJS.lib.WordArray.random(128 / 8).toString();
  var encryptedPassword = encryptPassword(firstHash, key);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    masterPassword: encryptedPassword,
    authenticationHash: secondHash,
    key: key,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Wrong Credentials!");
    var salt = req.body.username; //SALT
    var firstHash = getFirstHash(req.body.masterPassword, salt);
    var secondHash = getSecondHash(firstHash, salt);
    if (secondHash != user.authenticationHash) {
      res.status(401).json("pwd dont match!");
      return;
    } else {
      res.status(200).json(user);
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
