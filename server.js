const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectTOMongoDB } = require("./connect");
const app = express();
const bodyParser = require("body-parser");
const { URL } = require("url"); 

const mongoURI = process.env.MONGO_URI;
const BASE_URL = process.env.BASE_URL;

const parsedURL = new URL(BASE_URL);
const PORT = parsedURL.port || 80; 

const apiRoutes = require("./routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

connectTOMongoDB(mongoURI);

app.get("/", (req, res) => {
  res.send("Working well");
});
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${BASE_URL}`);
});
