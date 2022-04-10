const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Password", PasswordSchema);
