const router = require("express").Router();
const Password = require("../models/Password");
const CryptoJS = require("crypto-js");
const encryptPassword = require("../services/encrpytPassword");

//CREATE A PASSWORD
var key = CryptoJS.lib.WordArray.random(128 / 8).toString();

router.post("/", async (req, res) => {
  var encryptedPassword = encryptPassword(req.body.password, key);
  const newPassword = new Password({
    domain: req.body.domain,
    username: req.body.username,
    password: encryptedPassword,
    key: key,
  });
  try {
    const savedPassword = await newPassword.save();
    res.status(201).json(savedPassword);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//UPDATE PASSWORD

router.put("/:id", async (req, res) => {
  try {
    var encryptedPassword = encryptPassword(req.body.password, key);
    const updatedPassword = await Password.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          domain: req.body.domain,
          username: req.body.username,
          password: encryptedPassword,
          key: key,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPassword);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.status(200).json("user info deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//FIND PASSWORD USING DOMAIN name

router.get("/find/:domain", async (req, res) => {
  try {
    const info = await Password.find({ domain: req.params.domain });
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//GET A SINGLE PASSWORD
router.get("/find/:id", async (req, res) => {
  try {
    const info = await Password.findById({ _id: req.params.id });
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PASSWORDS

router.get("/", async (req, res) => {
  try {
    const info = await Password.find();
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
