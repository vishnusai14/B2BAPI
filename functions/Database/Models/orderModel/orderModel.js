const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  storeId: {
    type: String,
  },
  userId: {
    type: String,
  },
  storeName: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },

  productName: {
    type: String,
  },
  productPrize: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
