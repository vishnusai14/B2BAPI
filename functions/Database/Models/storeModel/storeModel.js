const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
  },
  contactMail: {
    type: String,
  },
  orders: {
    type: Array,
  },
});

const storeModel = mongoose.model("stores", storeSchema);

module.exports = storeModel;
