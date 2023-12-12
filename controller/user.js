var express = require("express");
var app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

//login
app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.json({
        payload: "กรุณากรอกข้อมูลให้ครบ",
        status: "ok",
      });
    }

    const user = await userModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user_id: user._id,
          username,
        },
        process.env.DB_TOKEN,
        { expiresIn: "10h" }
      );
      user.token = token;
      if (user.status === "Approve") {
        res.json({
          payload: "Welcom",
          status: "ok",
        });
      } else {
        res.json({
          payload: "รอการตอบรับ",
          status: "ok",
        });
      }
    } else {
      res.json({
        payload: "กรอกข้อมูลไม่ถูกต้อง",
        status: "ok",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

//register
app.post("/register", async (req, res, next) => {
  try {
    const { username, password, name, age, email } = req.body;
    if (!(username && password && name && age && email)) {
      res.json({
        payload: "กรุณากรอกข้อมูลให้ครบ",
        status: "ok",
      });
    } else {
      const checkUuser = await userModel.findOne({ username });

      if (checkUuser) {
        res.json({
          payload: "มีชื่อผู้ใช้ในระบบแล้ว",
          status: "ok",
        });
      }
      encryptPassword = await bcrypt.hash(password, 10);
      const user = new userModel({
        username,
        password: encryptPassword,
        name,
        age,
        email,
        status: "UnApprove",
      });
      const token = jwt.sign(
        {
          user_id: user._id,
          username,
        },
        process.env.DB_TOKEN,
        { expiresIn: "1h" }
      );
      user.token = token;
      await user.save();
      res.json({
        payload: "สร้างสำเร็จ",
        status: "ok",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

//approve
// app.put("/approve/:id", async (req, res, next) => {
//   try {
//     const user = req.params.id;
//     const updateUser = await userModel
//       .findById(user)
//       .updateOne({}, { status: "Approve" });
//     if (updateUser) {
//       res.json({
//         payload: "success",
//         status: "ok",
//       });
//     } else {
//       res.json({
//         payload: "ไม่มีชื่อผู้ใช้",
//         status: "ok",
//       });
//     }
//   } catch (error) {
//     res.json({
//       status: "error",
//     });
//   }
// });

module.exports = app;
