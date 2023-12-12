var express = require("express");
var app = express.Router();
const productSchema = require("../models/product");
const orderSchema = require("../models/orders");
// var auth1 = require("../middleware/jwt_auth");
//query
app.get("/products", async (req, res, next) => {
  try {
    const listProduct = await productSchema.find({});
    res.json({
      payload: listProduct,
      status: "ok",
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});
//query by ID
app.get("/products/:id", async (req, res, next) => {
  try {
    const objId = req.params.id;
    const product = await productSchema.findById(objId);
    res.json({
      payload: product,
      status: "ok",
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});
//create
app.post("/products", async (req, res, next) => {
  try {
    const { product_Name, stock_product, price } = req.body;
    const productsCreate = new productSchema({
      product_Name,
      stock_product,
      price,
    });
    productsCreate.save();
    res.json({
      payload: "success",
      status: "ok",
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});
//update
app.put("/products/:id", async (req, res, next) => {
  try {
    const objId = req.params.id;
    const { product_Name, stock_product, price } = req.body;
    const orders = await orderSchema.find({ products_Code: objId });

    await productSchema.findByIdAndUpdate(objId, {
      product_Name,
      stock_product,
      orders: orders.length,
      price,
    });
    orders.map(async (val) => {
      await orderSchema.findByIdAndUpdate(val._id, {
        orders_Name: product_Name,
        price,
      });
    });

    res.json({ payload: "success", status: "ok" });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

//delete
app.delete("/products/:id", async (req, res, next) => {
  try {
    const objId = req.params.id;
    const orders = await orderSchema.find({ products_Code: objId });
    await productSchema.findByIdAndDelete(objId);
    orders.map(async (val) => {
      await orderSchema.findByIdAndDelete(val._id);
    });
    res.json({
      payload: "success",
      status: "ok",
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

module.exports = app;
