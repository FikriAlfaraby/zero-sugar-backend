// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const clerkRoutes = require("./routes/clerkRoutes");


app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/clerk", clerkRoutes);

module.exports = app;
