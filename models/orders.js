const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    orders_Name: String,
    products_Code: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("orders", orderSchema);
