var express = require("express");
var app = express.Router();
const orderSchema = require("../models/orders");
const productSchema = require("../models/product");

//get orders
app.get("/orders", async (req, res) => {
  const orders = await orderSchema.find({});
  res.json({
    payload: orders,
    status: "ok",
  });
});
//get orders by products
app.get("/products/:id/orders", async (req, res) => {
  const { id } = req.params;
  const orders = await orderSchema.find({ products_Code: id });
  res.json({
    payload: orders,
    status: "ok",
  });
});

//create
app.post("/products/:id/orders", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findById(id);
    const orders_Name = product.product_Name;
    const products_Code = product._id;
    const price = product.price;
    const ordersList = await orderSchema.find({ products_Code: id });

    const createOrders = async () => {
      const orderSave = new orderSchema({
        orders_Name,
        products_Code,
        price,
      });
      return await orderSave.save();
    };

    const updateOrders = async () => {
      const orderUpdate = await productSchema.findByIdAndUpdate(id, {
        orders: ordersList.length + 1,
        stock_product: product.stock_product - 1,
      });

      return orderUpdate;
    };
    if (!product.stock_product == 0) {
      createOrders();
      updateOrders();
      res.json({
        payload: "เพิ่มออเดอร์",
        status: "ok",
      });
    } else {
      res.json({
        payload: "สินค้าหมด",
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
