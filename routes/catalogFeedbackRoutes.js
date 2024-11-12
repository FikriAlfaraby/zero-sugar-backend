const express = require("express");
const catalogFeedbackController = require("../controllers/catalogFeedbackController");

const router = express.Router();
router.post("/:id", catalogFeedbackController.createFeedback);

module.exports = router;