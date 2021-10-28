const functions = require("firebase-functions");
const userModel = require("../../Models/userModel/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN = functions.config().jwt.token;

const addUser = (res, email, password) => {
  userModel.findOne({ email: email }, async (err, found) => {
    if (!err) {
      if (found) {
        res.status(401).send({ data: "user Already Exist" });
        res.end();
      } else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
          email: email,
          password: encryptedPassword,
        });
        newUser
          .save()
          .then((response) => {
            res.status(200).send({ data: response });
            res.end();
          })
          .catch((err) => {
            res.status(500).send({ data: err });
            res.end();
          });
      }
    } else {
      res.status(500).send({ data: err });
      res.end();
    }
  });
};

const loginUser = (res, email, password) => {
  userModel.findOne({ email: email }, async (err, found) => {
    if (err) {
      res.status(400).send({ data: err });
      res.end();
    } else {
      if (found) {
        const isPasswordMatch = await bcrypt.compare(password, found.password);
        if (isPasswordMatch) {
          //Send A JWT Token
          const token = jwt.sign(
            {
              id: found._id,
              email: found.email,
            },
            TOKEN,
            {
              expiresIn: "2h",
            }
          );
          res.status(200).send({ data: token });
          res.end();
        } else {
          res.status(401).send({ data: "UnAuthorized" });
          res.end();
        }
      } else {
        res.status(401).send({ data: "UnAuthorized" });
        res.end();
      }
    }
  });
};





module.exports = {
  addUser: addUser,
  loginUser: loginUser,
};
