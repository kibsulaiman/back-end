const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    product_Name: String,
    stock_product: Number,
    orders: { type: Number, default: 0 },
    price: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("products", productSchema);
