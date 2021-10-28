const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  storeId: {
    type: String,
  },
  productName: {
    type: String,
  },
  productCategory: {
    type: String,
  },
  productPrize: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
