const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectTOMongoDB } = require("./connect");
const app = express();
const bodyParser = require("body-parser");
const { URL } = require("url"); // Import the URL module

const mongoURI = process.env.MONGO_URI;
const BASE_URL = process.env.BASE_URL; // e.g., "http://localhost:5000"

// Parse the port number from the BASE_URL
const parsedURL = new URL(BASE_URL);
const PORT = parsedURL.port || 80; // Default to port 80 if no port is specified

// Import routes
const apiRoutes = require("./routes/route");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Connect to MongoDB
connectTOMongoDB(mongoURI);

// Routes
app.get("/", (req, res) => {
  res.send("Working well");
});
app.use("/api", apiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at ${BASE_URL}`);
});
