// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Clerk = require("@clerk/express");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const clerkRoutes = require("./routes/clerkRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/clerk", clerkRoutes);

module.exports = app;
