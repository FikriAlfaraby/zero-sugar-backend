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
const catalogRoutes = require("./routes/catalogRoutes");
const catalogFeedbackRoutes = require("./routes/catalogFeedbackRoutes");
const testRoutes = require("./routes/testRoutes");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/clerk", clerkRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/journey", userJourneyRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/catalog-feedback", catalogFeedbackRoutes);
app.use("/api/test", testRoutes);

module.exports = app;
