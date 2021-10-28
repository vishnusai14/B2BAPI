const express = require("express");
const storeController = require("../../Database/Functions/storeController/storeController");
const orderController = require("../../Database/Functions/orderController/orderController");
const Router = express.Router();
const ensureToken = require("../../Utils/ensureToken");

//Checking The Private API
Router.get("/", ensureToken,  (req, res, next) => {
  res.status(200).send({ data: "Private API Working" });
});

//Post Request For Adding The Store
Router.post("/stores/addStore", ensureToken,  (req, res, next) => {
  const { storeName, contactMail, products } = req.body;
  storeController.addStore(res, storeName, contactMail, products);
});

//Post Request For Adding the Products

Router.post("/products/addProducts", ensureToken, (req, res, next) => {
  const { storeId, products } = req.body;
  storeController.addProducts(res, storeId, products);
});

//Get request to get the products in the store

Router.get("/products/getProducts/:storeId", ensureToken, (req, res, next) => {
  const storeId = req.params.storeId;
  storeController.getProducts(res, storeId);
});

// Get Request To Display All the Orders

Router.get("/orders/getAllOrders", ensureToken, (req, res, next) => {
  orderController.getAllOrders(res);
});

// Get Request to display order based on store

Router.get("/orders/getOrder/:storeId", ensureToken, (req, res,next) => {
  orderController.getOrderByStoreId(res, req.params.storeId);
});
module.exports = Router;
