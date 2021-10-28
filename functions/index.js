const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({origin : true}));
const baseUrl = "/api/v1";
const privateRouter = require("./Routes/Private/privateRoute");
const publicRouter = require("./Routes/Public/publicRoute");
// const dbUri = "mongodb://localhost:27017/infoware";
const dbUri = `mongodb+srv://Vishnu_Sai:${functions.config().db.pass}@cluster0.hkghe.mongodb.net/${functions.config().db.name}?retryWrites=true&w=majority`
const connect = require("./Database/Connection/connection");
// Connecting To The Database
connect(dbUri);
console.log(functions.config());

// Checking The Whole API
app.get(`${baseUrl}/`, (req, res) => {
    res.status(200).send({ data: "API Working" });
  res.end();
});

app.use(`${baseUrl}/private`, privateRouter);
app.use(`${baseUrl}/public`, publicRouter);

// app.listen(PORT, () => {
//     console.log("Port Started");
// });

exports.b2bApi = functions.https.onRequest(app);
