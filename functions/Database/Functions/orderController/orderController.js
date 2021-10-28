const functions = require("firebase-functions");
const orderModel = require("../../Models/orderModel/orderModel");
const productModel = require("../../Models/productModel/productModel");
const storeModel = require("../../Models/storeModel/storeModel");
const userModel = require("../../Models/userModel/userModel");
const jwt = require("jsonwebtoken");
const TOKEN = functions.config().jwt.token;

const orderProducts = (res, orderedProducts, jwtToken) => {
  try {
    const user = jwt.verify(jwtToken, TOKEN);
    if (user) {
      getApprove(orderedProducts)
        .then(async (response) => {
          let totalPrizeToPay = response;
          let orderItems = [{ totalPrizeToPay: totalPrizeToPay }];
          orderedProducts.forEach((product) => {
            console.log(product);
            let newOrder = new orderModel({
              storeId: product.store.storeId,
              storeName: product.store.storeName,
              totalPrize: product.quantity * product.prize,
              productName: product.name,
              productPrize: product.prize,
              productCategory : product.category,
              quantity: product.quantity,
              userId: user.id,
            });
            orderItems.push(newOrder);
            newOrder.save();
          });

          res.status(200).send({ data: orderItems });
          res.end();
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ data: err });
          res.end();
        });
    } else {
      res.status(400).send({ data: "UnAuthorized" });
      res.end();
    }
  } catch (e) {
    res.status(400).send({ data: "UnAuthorized" });
    res.end();
  }
};

const getApprove = (orderedProducts) => {
  return new Promise((resolve, reject) => {
    let j = 1;
    let totalPrice = 0;
    for (let i = 0; i < orderedProducts.length; i++) {
      let continueLoop = true;
      productModel.findOne(
        { _id: orderedProducts[i].productId },
        (err, found) => {
          if (err) {
            // res.status(500).send({ data: err });
            // res.end();
            reject(err);
            continueLoop = false;
          } else {
            if (found) {
              if (found.quantity < orderedProducts[i].quantity) {
                console.log("Yes");
                // res.status(500).send({ data: "Quantity Exceed" });
                // res.end();
                reject("Quantity Exceed");
                continueLoop = false;
              } else {
                totalPrice +=
                  orderedProducts[i].quantity * parseInt(found.productPrize);
                if (j === orderedProducts.length) {
                  resolve(totalPrice);
                }
                j = j + 1;
              }
            } else {
              // res.status(500).send({ data: err });
              // res.end();
              reject("Error");
              continueLoop = false;
            }
          }
        }
      );
      if (!continueLoop) {
        break;
      }
    }
  });
};

const getAllOrders = (res) => {
  orderModel.find({}, async (err, found) => {
    if (err) {
      res.status(500).send({ data: err });
      res.end();
    } else {
      if (found) {
        let displayResults = [];
        for (const value of found) {
          console.log(value);
          let result = {
            productName: value.productName,
            productPrize: value.productPrize,
            quantity: value.quantity,
            storeDetail: await storeModel.findOne({ _id: value.storeId }, {storeName : 1, contactMail : 1}),
            userDetail: await userModel.findOne(
              { _id: value.userId },
              { email: 1 }
            ),
          };
          displayResults.push(result);
        }
        res.status(200).send({ data: displayResults });
        res.end();
      } else {
        res.status(400).send({ data: "Not Found" });
        res.end();
      }
    }
  });
};

const getOrderByStoreId = (res, storeId) => {
  orderModel.find({ storeId: storeId }, async (err, found) => {
    if (err) {
      res.status(500).send({ data: err });
      res.end();
    } else {
      if (found) {
        let displayResults = [];
        for (const value of found) {
          let result = {
            productName: value.productName,
            productPrize: value.productPrize,
            quantity: value.quantity,
            storeDetail: await storeModel.findOne({ _id: value.storeId }, {storeName : 1, contactMail : 1}),
            userDetail: await userModel.findOne(
              { _id: value.userId },
              { email: 1 }
            ),
          };
          displayResults.push(result);
        }
        res.status(200).send({ data: displayResults });
        res.end();
      } else {
        res.status(400).send({ data: "Not Found" });
        res.end();
      }
    }
  });
};

const getOrderByUserId = (res, jwtToken) => {
  try {
    const user = jwt.verify(jwtToken, TOKEN);
    if (user) {
      orderModel.find({ userId: user.id }, async (err, found) => {
        if (err) {
          res.status(500).send({ data: err });
          res.end();
        } else {
          if (found) {
            let displayResults = [];
            for (const value of found) {
              let result = {
                productName: value.productName,
                productPrize: value.productPrize,
                quantity: value.quantity,
                storeDetail: await storeModel.findOne({ _id: value.storeId }, {storeName : 1, contactMail : 1}),
                userDetail: await userModel.findOne(
                  { _id: value.userId },
                  { email: 1 }
                ),
              };
              displayResults.push(result);
            }
            res.status(200).send({ data: displayResults });
            res.end();
          } else {
            res.status(404).send({ data: "Not Found" });
            res.end();
          }
        }
      });
    } else {
      res.status(400).send({ data: "UnAuthorized" });
      res.end();
    }
  } catch (e) {
    res.status(400).send({ data: e });
    res.end();
  }
};

module.exports = {
  orderProducts: orderProducts,
  getAllOrders: getAllOrders,
  getOrderByStoreId: getOrderByStoreId,
  getOrderByUserId: getOrderByUserId,
};
