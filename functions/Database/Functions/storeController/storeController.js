const storeModel = require("../../Models/storeModel/storeModel");
const productModel = require("../../Models/productModel/productModel");

const addStore = (res, storeName, contactMail, products) => {
  const newStore = new storeModel({
    storeName: storeName,
    contactMail: contactMail,
    orders: [],
  });
  newStore
    .save()
    .then((response) => {
      if (products.length === 0) {
        res.status(200).send({ data: response });
        res.end();
      } else {
        console.log("Product is There");
        let productsRecord = [];
        products.forEach((product) => {
          console.log(product);
          let newProduct = {
            storeId: response._id.toString(),
            productName: product.name.toString().toLowerCase(),
            productCategory: product.category.toString().toLowerCase(),
            productPrize: product.prize,
            quantity: product.quantity,
          };
          productsRecord.push(newProduct);
        });
        console.log(productsRecord);
        productModel.collection
          .insertMany(productsRecord)
          .then((result) => {
            console.log(result);
          })
          .catch((Err) => {
            console.log(Err);
          });
        res.status(200).send({ data: response });
        res.end();
      }
    })
    .catch((err) => {
      res.status(500).send({ data: err });
      res.end();
    });
};

const addProducts = (res, storeId, products) => {
  products.forEach((product) => {
    let newProduct = new productModel({
      storeId: storeId,
      productName: product.name.toString().toLowerCase(),
      productCategory: product.category.toString().toLowerCase(),
      productPrize: product.prize,
      quantity: product.quantity,
    });
    newProduct.save();
  });
  res.status(200).send({ data: "Product Saved" });
  res.end();
};

const getProducts = (res, storeId) => {
  productModel.find({ storeId: storeId }, (err, found) => {
    if (err) {
      res.status(500).send({ data: err });
      res.end();
    } else {
      if (found) {
        res.status(200).send({ data: found });
        res.end();
      } else {
        res.status(404).send({ data: "No Store Found" });
        res.end();
      }
    }
  });
};

module.exports = {
  addStore: addStore,
  addProducts: addProducts,
  getProducts: getProducts,
};
