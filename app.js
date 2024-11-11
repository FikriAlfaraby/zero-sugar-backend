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
const userProfileRoutes = require("./routes/userProfileRoutes")
const userJourneyRoutes = require("./routes/userJourneyRoutes")

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/clerk", clerkRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/journey", userJourneyRoutes);

module.exports = app;
