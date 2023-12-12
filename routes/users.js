var express = require("express");
var router = express.Router();
let userSchema = require("../models/user.model");
const bcrypt = require("bcrypt");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
//     );
//   },
// });

// const upload = multer({ storage: storage });
/* GET users listing. */
// router.post("/", upload.single("image"), async function (req, res, next) {
router.post("/", async function (req, res, next) {
  try {
    const { username, password, name, age, email } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    let newUser = new userSchema({
      username: username,
      password: hashPassword,
      name: name,
      age: age,
      email: email,
    });
    await newUser.save();
    return res.status(201).send("success");
  } catch (error) {
    return res.status(500).send("error");
  }
});

module.exports = router;
