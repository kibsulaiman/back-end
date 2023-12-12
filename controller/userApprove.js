var express = require("express");
var app = express.Router();
const userModel = require("../models/user.model");

app.put("/approve/:id", async (req, res, next) => {
  try {
    const user = req.params.id;
    const updateUser = await userModel
      .findById(user)
      .updateOne({}, { status: "Approve" });
    if (updateUser) {
      res.json({
        payload: "success",
        status: "ok",
      });
    } else {
      res.json({
        payload: "ไม่มีชื่อผู้ใช้",
        status: "ok",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

module.exports = app;
