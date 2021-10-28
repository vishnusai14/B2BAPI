const express = require("express");
const Router = express.Router();
const userController = require("../../Database/Functions/userController/userController");
const productController = require("../../Database/Functions/productController/productController");
const orderController = require("../../Database/Functions/orderController/orderController");

//Checking The Public API
Router.get("/", (req, res) => {
  res.status(200).send({ data: "Public API Working" });
});

//Post Request for adding User
Router.post("/users/addUser", (req, res) => {
  const { email, password } = req.body;
  userController.addUser(res, email, password);
});

//Post to login a user and sent them a token

Router.post("/users/loginUser", (req, res) => {
  const { email, password } = req.body;
  userController.loginUser(res, email, password);
});

//Get Request for browsing the products

//To get All Products

Router.get("/products/all", (req, res) => {
  productController.getAllProducts(res);
});

//To get product based on category
Router.get("/products/category/:category", (req, res) => {
  const category = req.params.category.toString().toLowerCase();
  productController.getProductsByCategory(res, category);
});

//To get Product By Name

Router.get("/products/name/:name", (req, res) => {
  const name = req.params.name;
  productController.getProductsByName(res, name);
});

Router.post("/orders/orderProducts", (req, res) => {
  const { orderedProducts, jwtToken } = req.body;
  orderController.orderProducts(res, orderedProducts, jwtToken);
});

Router.get("/orders/getMyOrders/:jwtToken", (req, res) => {
  const  jwtToken  = req.params.jwtToken;
  orderController.getOrderByUserId(res, jwtToken);
});

module.exports = Router;
