const productModel = require("../../Models/productModel/productModel");
const storeModel = require("../../Models/storeModel/storeModel");
const getAllProducts = (res) => {
  productModel.find({}, async (err, found) => {
    if (err) {
      res.status(500).send({ data: err });
      res.end();
    } else {
      if (found) {
        let displayResults = [];
        for (const result of found) {
          displayResults.push({
            productId: result._id,
            productName: result.productName,
            productCategory: result.productCategory,
            productPrize: result.productPrize,
            quantity: result.quantity,
            store: await storeModel.findOne(
              { _id: result.storeId },
              { _id: 1, storeName: 1, contactMail: 1 }
            ),
          });
        }
        console.log(displayResults);
        res.status(200).send({ data: displayResults });
        res.end();
      } else {
        res.status(404).send({ data: "No Products Found" });
        res.end();
      }
    }
  });
};

const getProductsByCategory = (res, category) => {
  productModel.find({ productCategory: category }, async (err, found) => {
    if (err) {
      res.status(500).send({ data: err });
      res.end();
    } else {
      if (found) {
        let displayResults = [];
        for (const result of found) {
          displayResults.push({
            productId: result._id,
            productName: result.productName,
            productCategory: result.productCategory,
            productPrize: result.productPrize,
            quantity: result.quantity,
            storeName: await storeModel.findOne(
              { _id: result.storeId },
              { _id: 1, storeName: 1, contactMail: 1 }
            ),
          });
        }
        res.status(200).send({ data: displayResults });
        res.end();
      } else {
        res.status(404).send({ data: "No Products Found" });
        res.end();
      }
    }
  });
};

const getProductsByName = (res, name) => {
  productModel.find({}, async (err, found) => {
    if (err) {
      res.status(500).send({ data: err });
      res.end();
    } else {
      if (found) {
        let displayResults = [];
        for (const result of found) {
          if (result.productName.includes(name)) {
            displayResults.push({
              productId: result._id,
              productName: result.productName,
              productCategory: result.productCategory,
              productPrize: result.productPrize,
              quantity: result.quantity,
              storeDetail: await storeModel.findOne(
                { _id: result.storeId },
                { _id: 1, storeName: 1, contactMail: 1 }
              ),
            });
          }
        }
        res.status(200).send({ data: displayResults });
        res.end();
      } else {
        res.status(404).send({ data: "No Products Found" });
        res.end();
      }
    }
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductsByCategory: getProductsByCategory,
  getProductsByName: getProductsByName,
};
