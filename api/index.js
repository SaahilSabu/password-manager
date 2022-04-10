require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

const userRoute = require("./routes/userRoute");
const passwordRoute = require("./routes/password");

// const url = process.env.MONGO_URL;
mongoose
  .connect("mongodb+srv://admin-saahil:Test123@cluster0.smide.mongodb.net/passwordManager?retryWrites=true&w=majority")
  .then(() => console.log("DB Running Succesfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use("/api/auth", userRoute);
app.use("/api/password", passwordRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
